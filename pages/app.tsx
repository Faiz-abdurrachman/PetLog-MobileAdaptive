import Link from "next/link";
import { useLucid } from "../contexts/LucidContext";
import { Cat, PawPrint, Shield, Database, Wallet } from "lucide-react";

const features = [
  {
    title: "Self-attested Digital Ownership",
    description:
      "Create verified digital ownership records that live permanently on blockchain",
    icon: Shield,
    gradient: "from-blue-100 via-sky-50 to-cyan-100",
  },
  {
    title: "IPFS-backed Metadata",
    description:
      "Your pet's data is stored on IPFS with immutable on-chain proof of authenticity",
    icon: Database,
    gradient: "from-green-100 via-emerald-50 to-teal-100",
  },
  {
    title: "Cardano Native Minting",
    description:
      "Seamless wallet-native minting flow on Cardano Pre-Production network",
    icon: Wallet,
    gradient: "from-purple-100 via-violet-50 to-indigo-100",
  },
];

export default function Home() {
  const { account } = useLucid();

  return (
    <div className="mx-auto max-w-6xl px-1 pb-8 pt-4 sm:px-4 sm:pb-20 sm:pt-10 lg:px-6 lg:pb-24 lg:pt-12">
      {/* Hero Section */}
      <section className="rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 px-2 py-6 shadow-[0_28px_80px_rgba(244,175,208,0.35)] ring-1 ring-rose-100 sm:px-6 sm:py-12 lg:px-12 lg:py-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-rose-500 ring-1 ring-white/60 sm:px-3 sm:py-1.5 sm:px-4 sm:py-2">
            PetLog V1.1
          </span>
          <h1 className="mt-2 text-xl font-semibold leading-tight text-pl-heading sm:text-2xl sm:mt-3 lg:text-3xl xl:text-4xl">
            Create a Digital Passport
            <br />
            for Your Pet in Minutes
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-pl-body opacity-80 sm:mt-4 sm:text-base lg:mt-6 lg:text-lg">
            PetLog transforms your pet&apos;s core identity into a collectible
            certificate. Mint on the Cardano Pre-Production testnet and preserve
            provenance in your wallet forever.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:mt-6 sm:flex-row sm:gap-3 lg:mt-8 lg:gap-4">
            <Link
              href="/mint"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-pl-heading shadow-[0_20px_50px_rgba(244,175,208,0.45)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(244,175,208,0.55)] sm:px-8 sm:py-3 sm:text-sm lg:px-10 lg:text-base"
            >
              <PawPrint size={14} className="sm:w-4 sm:h-4" />
              Start Creating Now
            </Link>
            <Link
              href="/my-passports"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/80 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-pl-heading ring-1 ring-rose-200 shadow-[0_14px_32px_rgba(255,255,255,0.35)] transition duration-200 hover:-translate-y-0.5 hover:bg-white/90 sm:px-8 sm:py-3 sm:text-sm lg:px-10 lg:text-base"
            >
              <Cat size={14} className="sm:w-4 sm:h-4" />
              View My Pet Crew
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-8 sm:mt-12 lg:mt-16 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-white/80 px-2 py-6 shadow-[0_24px_60px_rgba(212,177,189,0.25)] ring-1 ring-rose-100 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
        <header className="max-w-3xl space-y-2 sm:space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
            Why Choose PetLog?
          </p>
          <h2 className="text-lg font-semibold text-pl-heading sm:text-2xl lg:text-3xl">
            Built for Modern Pet Ownership
          </h2>
          <p className="text-sm leading-relaxed text-pl-body opacity-80 sm:text-base lg:text-lg">
            Experience the future of pet documentation with blockchain-powered
            security and user-friendly design.
          </p>
        </header>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:mt-10 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className={`rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] bg-gradient-to-br ${feature.gradient} p-3 ring-1 ring-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:p-4 lg:p-5`}
              >
                <div className="flex items-center gap-1.5 mb-2 sm:gap-2 sm:mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 sm:h-10 sm:w-10 sm:rounded-xl">
                    <IconComponent
                      size={16}
                      className="text-pl-heading sm:w-5 sm:h-5"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-pl-heading sm:text-lg lg:text-xl">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-pl-body opacity-80 sm:text-sm lg:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Coming Next Section */}
      <section className="mt-8 sm:mt-12 lg:mt-16 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-gradient-to-r from-rose-200/60 via-white/80 to-sky-200/60 px-2 py-6 shadow-[0_20px_60px_rgba(244,175,208,0.28)] ring-1 ring-rose-100 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
        <div className="text-center">
          <div className="mx-auto max-w-3xl space-y-2 sm:space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
              Coming Next
            </p>
            <h2 className="text-lg font-semibold text-pl-heading sm:text-2xl lg:text-3xl">
              The Future of PetLog
            </h2>
            <p className="text-sm leading-relaxed text-pl-body opacity-80 sm:text-base lg:text-lg">
              This release focuses on Level 1 self-attested passports. Future
              versions will introduce verified partners, shared galleries, and
              validation workflows.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 lg:mt-10 sm:grid-cols-3">
            <div className="rounded-[12px] sm:rounded-[16px] bg-white/75 p-3 ring-1 ring-white/70 sm:p-4 lg:p-5">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 mx-auto sm:mb-3 sm:h-10 sm:w-10">
                <Shield size={14} className="text-rose-600 sm:w-4 sm:h-4" />
              </div>
              <h3 className="text-sm font-semibold text-pl-heading mb-1 sm:text-base lg:text-lg">
                Verified Partners
              </h3>
              <p className="text-xs text-pl-body opacity-80">
                Connect with certified breeders and veterinarians
              </p>
            </div>

            <div className="rounded-[12px] sm:rounded-[16px] bg-white/75 p-3 ring-1 ring-white/70 sm:p-4 lg:p-5">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 mx-auto sm:mb-3 sm:h-10 sm:w-10">
                <Cat size={14} className="text-amber-600 sm:w-4 sm:h-4" />
              </div>
              <h3 className="text-sm font-semibold text-pl-heading mb-1 sm:text-base lg:text-lg">
                Shared Galleries
              </h3>
              <p className="text-xs text-pl-body opacity-80">
                Showcase your pet collection publicly
              </p>
            </div>

            <div className="rounded-[12px] sm:rounded-[16px] bg-white/75 p-3 ring-1 ring-white/70 sm:p-4 lg:p-5">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 mx-auto sm:mb-3 sm:h-10 sm:w-10">
                <Database size={14} className="text-sky-600 sm:w-4 sm:h-4" />
              </div>
              <h3 className="text-sm font-semibold text-pl-heading mb-1 sm:text-base lg:text-lg">
                Validation Workflows
              </h3>
              <p className="text-xs text-pl-body opacity-80">
                Multi-step verification processes
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12">
            <Link
              href="/mint"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-pl-heading shadow-[0_20px_50px_rgba(244,175,208,0.45)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(244,175,208,0.55)] sm:px-10 sm:py-3 sm:text-base"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
