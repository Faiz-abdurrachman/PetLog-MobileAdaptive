import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { PassportPreview } from "../../components/PassportPreview";
import { useLucid } from "../../contexts/LucidContext";
import { mintPetLogPassport } from "../../lib/minting-utils";
import {
  DigitalPetPassport,
  DigitalPetPassportForm,
  PetLogCipMetadata,
} from "../../types/passport";

const initialForm: DigitalPetPassportForm = {
  identity: { cat_name: "", date_of_birth: "" },
  attributes: { breed: "", coat_color: "", sex: "Male" },
  unique_identification: { microchip_number: "" },
  provenance: { sire_name: "", dam_name: "" },
};

const steps = ["Identity", "Details", "Preview"];

export default function MintPage() {
  const router = useRouter();
  const { lucid, account } = useLucid();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<DigitalPetPassportForm>(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const [group, field] = name.split(".");

    setForm((prev) => ({
      ...prev,
      [group]: {
        ...(prev as any)[group],
        [field]: value,
      },
    }));
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const canProceed = useMemo(() => {
    if (step === 0) {
      return Boolean(
        form.identity.cat_name &&
          form.identity.date_of_birth &&
          form.attributes.breed &&
          form.attributes.coat_color &&
          form.attributes.sex
      );
    }

    if (step === 1) {
      return Boolean(form.unique_identification.microchip_number && imageFile);
    }

    return true;
  }, [step, form, imageFile]);

  const goNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
      setError(null);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const buildPassportMetadata = (imageCid: string): DigitalPetPassport => {
    return {
      ...form,
      platform_info: {
        image_url: `ipfs://${imageCid}`,
        validation_tier: "Level 1 - Self Attested",
        minted_on: new Date().toISOString(),
        application_version: "1.0",
      },
    };
  };

  const handleMint = async (event: FormEvent) => {
    event.preventDefault();
    if (!lucid || !account?.address) {
      setError("Please connect a Cardano wallet before minting.");
      return;
    }
    if (!imageFile) {
      setError("A passport photo is required.");
      return;
    }

    try {
      setIsMinting(true);
      setError(null);
      setStatus("Sending your new Paw-ssport to the Cardano universe...");

      const body = new FormData();
      body.append("image", imageFile);
      body.append("cat_name", form.identity.cat_name);
      body.append("date_of_birth", form.identity.date_of_birth);
      body.append("breed", form.attributes.breed);
      body.append("coat_color", form.attributes.coat_color);
      body.append("sex", form.attributes.sex);
      body.append(
        "microchip_number",
        form.unique_identification.microchip_number
      );
      body.append("sire_name", form.provenance?.sire_name ?? "");
      body.append("dam_name", form.provenance?.dam_name ?? "");

      const uploadResponse = await fetch("/api/mint-asset", {
        method: "POST",
        body,
      });

      if (!uploadResponse.ok) {
        const message = await uploadResponse
          .json()
          .catch(() => ({ error: uploadResponse.statusText }));
        throw new Error(message.error || "Failed to upload assets to IPFS");
      }

      const { image, metadata } = (await uploadResponse.json()) as {
        image: string;
        metadata: string;
      };
      if (!image || !metadata) {
        throw new Error("Upload API did not return valid IPFS hashes");
      }

      const passport = buildPassportMetadata(image);
      const cipMetadata: PetLogCipMetadata = {
        name: `PetLog Passport - ${form.identity.cat_name}`,
        image: `ipfs://${image}`,
        description: `Self-attested digital passport for ${form.identity.cat_name}`,
        files: [
          {
            name: "PetLog Passport Metadata",
            mediaType: "application/json",
            src: `ipfs://${metadata}`,
          },
        ],
        passport,
      };

      const { txHash, unit } = await mintPetLogPassport({
        lucid,
        address: account.address,
        name: form.identity.cat_name,
        cipMetadata,
      });

      const query = new URLSearchParams({ tx: txHash, asset: unit });
      if (form.identity.cat_name) {
        query.set("pet", form.identity.cat_name);
      }

      setStatus(null);
      router.push(`/mint/success?${query.toString()}`);
    } catch (err) {
      console.error("Mint failed", err);
      setError(err instanceof Error ? err.message : "Failed to mint passport");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 pt-4 sm:space-y-6 sm:pt-6 lg:space-y-8 lg:pt-8">
      {/* Header Section */}
      <section className="rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-white/80 px-2 py-4 shadow-[0_24px_60px_rgba(212,177,189,0.25)] ring-1 ring-rose-100 text-center sm:px-4 sm:py-6 lg:px-6 lg:py-8">
        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-100 to-amber-100 px-2 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-rose-700 ring-1 ring-rose-200 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2">
          Digital Pet Passport
        </span>
        <h1 className="mt-2 text-lg font-semibold text-pl-heading sm:text-2xl lg:text-3xl xl:text-4xl sm:mt-3">
          Create Your Pet&apos;s Digital Identity
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-pl-body opacity-80 sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
          Complete the guided flow to create a Level 1 self-attested ownership
          certificate for your pet.
        </p>
      </section>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 lg:gap-3">
        {steps.map((label, index) => (
          <div key={label} className="flex items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 font-semibold text-xs transition-all duration-300 sm:h-8 sm:w-8 sm:text-sm lg:h-10 lg:w-10 lg:text-base ${
                  index === step
                    ? "bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300 border-rose-300 text-white shadow-[0_8px_24px_rgba(244,175,208,0.4)]"
                    : index < step
                    ? "bg-green-100 border-green-300 text-green-700"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {index < step ? "✓" : index + 1}
              </span>
              <span
                className={`text-xs uppercase tracking-[0.2em] font-semibold ${
                  index === step ? "text-pl-heading" : "text-pl-muted"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-px w-3 sm:w-4 lg:w-6 ${
                  index < step ? "bg-green-300" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleMint} className="space-y-8">
        {step === 0 && (
          <section className="rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 px-2 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-blue-100 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
            <h2 className="text-lg font-semibold text-pl-heading mb-3 sm:text-xl lg:text-2xl sm:mb-4 lg:mb-6">
              Pet Identity
            </h2>
            <div className="grid gap-3 sm:gap-4 lg:gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 sm:gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
                  Pet Name
                </span>
                <input
                  name="identity.cat_name"
                  value={form.identity.cat_name}
                  onChange={handleInput}
                  className="rounded-lg border-2 border-blue-200 bg-white/70 px-2.5 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200/50 sm:px-3 sm:py-2.5 sm:text-base"
                  placeholder="Enter your pet's name"
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
                  Date of Birth
                </span>
                <input
                  type="date"
                  name="identity.date_of_birth"
                  value={form.identity.date_of_birth}
                  onChange={handleInput}
                  className="rounded-lg border-2 border-blue-200 bg-white/70 px-2.5 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200/50 sm:px-3 sm:py-2.5 sm:text-base"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 sm:gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 sm:text-sm">
                  Breed
                </span>
                <input
                  name="attributes.breed"
                  value={form.attributes.breed}
                  onChange={handleInput}
                  className="rounded-xl border-2 border-blue-200 bg-white/70 px-3 py-2.5 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200/50 sm:px-4 sm:py-3 sm:text-base"
                  placeholder="e.g., Persian, Siamese"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 sm:gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 sm:text-sm">
                  Coat Color
                </span>
                <input
                  name="attributes.coat_color"
                  value={form.attributes.coat_color}
                  onChange={handleInput}
                  className="rounded-xl border-2 border-blue-200 bg-white/70 px-3 py-2.5 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200/50 sm:px-4 sm:py-3 sm:text-base"
                  placeholder="e.g., Orange Tabby, Black"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 sm:gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 sm:text-sm">
                  Gender
                </span>
                <select
                  name="attributes.sex"
                  value={form.attributes.sex}
                  onChange={handleInput}
                  className="rounded-xl border-2 border-blue-200 bg-white/70 px-3 py-2.5 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200/50 sm:px-4 sm:py-3 sm:text-base"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-green-100 sm:px-6 sm:py-8">
            <h2 className="text-xl font-semibold text-pl-heading mb-4 sm:text-2xl sm:mb-6">
              Additional Details & Photo
            </h2>
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <label className="flex flex-col gap-2 sm:gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
                    Microchip Number
                  </span>
                  <input
                    name="unique_identification.microchip_number"
                    value={form.unique_identification.microchip_number}
                    onChange={handleInput}
                    className="rounded-xl border-2 border-green-200 bg-white/70 px-4 py-3 text-base focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200/50"
                    placeholder="Enter microchip number"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 sm:gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
                    Sire Name (Optional)
                  </span>
                  <input
                    name="provenance.sire_name"
                    value={form.provenance?.sire_name ?? ""}
                    onChange={handleInput}
                    className="rounded-xl border-2 border-green-200 bg-white/70 px-4 py-3 text-base focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200/50"
                    placeholder="Father's name"
                  />
                </label>
                <label className="flex flex-col gap-2 sm:gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
                    Dam Name (Optional)
                  </span>
                  <input
                    name="provenance.dam_name"
                    value={form.provenance?.dam_name ?? ""}
                    onChange={handleInput}
                    className="rounded-xl border-2 border-green-200 bg-white/70 px-4 py-3 text-base focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200/50"
                    placeholder="Mother's name"
                  />
                </label>
              </div>
              <div className="space-y-4">
                <label className="flex flex-col gap-2 sm:gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
                    Passport Photo
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImage}
                    className="rounded-xl border-2 border-green-200 bg-white/70 px-4 py-3 text-base focus:border-green-400 focus:outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-green-100 file:px-3 file:py-1 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-200"
                  />
                  <span className="text-sm text-green-600">
                    JPEG, PNG, or WebP up to 5MB
                  </span>
                </label>
                {imagePreview && (
                  <div className="rounded-xl border-2 border-green-200 bg-white/70 p-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-48 w-48 rounded-lg object-cover shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 px-4 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-purple-100 sm:px-6 sm:py-8">
            <h2 className="text-xl font-semibold text-pl-heading mb-4 sm:text-2xl sm:mb-6">
              Preview & Confirm
            </h2>
            <PassportPreview formData={form} imagePreview={imagePreview} />
            <div className="mt-6 rounded-xl bg-amber-50 border-2 border-amber-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-800 mb-2">
                    Important Notice
                  </p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Level 1 passports are self-attested. Ensure all information
                    is accurate before minting — once recorded on-chain it
                    cannot be altered.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Status Messages */}
        <div aria-live="polite" className="space-y-4">
          {error && (
            <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="text-sm font-semibold text-red-800 mb-1">
                    Error
                  </p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          {status && !error && (
            <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-4">
              <div className="flex items-center justify-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                <p className="text-sm font-semibold text-blue-800">{status}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-4">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0 || isMinting}
            className="inline-flex items-center justify-center rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-pl-heading ring-1 ring-gray-200 shadow-md transition-all duration-200 hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 lg:text-base"
          >
            ← Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed || isMinting}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300 px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(244,175,208,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(244,175,208,0.5)] disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 lg:text-base"
            >
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isMinting}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-400 px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(34,197,94,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(34,197,94,0.5)] disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:py-2.5 sm:text-sm lg:px-8 lg:py-3 lg:text-base"
            >
              {isMinting ? "Minting..." : "🎉 Mint Pet Passport"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
