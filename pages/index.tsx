import Link from "next/link";

const nftCards = [
  {
    title: "Luna",
    stat: "Silver Bengal - Born 2021",
    description: "Starlight Navigator",
    gradient: "from-red-100 via-rose-50 to-pink-100",
  },
  {
    title: "Mochi",
    stat: "Ragdoll - Born 2020",
    description: "Cuddle Diplomat",
    gradient: "from-blue-100 via-cyan-50 to-sky-100",
  },
  {
    title: "Aster",
    stat: "Scottish Fold - Born 2023",
    description: "Whisker Archivist",
    gradient: "from-green-100 via-emerald-50 to-teal-100",
  },
  {
    title: "Pixel",
    stat: "Sphynx - Born 2019",
    description: "Warmth Seeker",
    gradient: "from-purple-100 via-violet-50 to-indigo-100",
  },
];

const problemCards = [
  {
    title: "Fake Pedigree Certificates",
    stat: "42% of pedigree certificates in Asia are unverifiable",
    description:
      "Too many breeders still rely on paper-based proof that can be forged, lost, or duplicated — breaking trust between buyers and associations.",
    source: "(Source: Asian Kennel Network, 2024)",
    gradient: "from-red-100 via-rose-50 to-pink-100",
  },
  {
    title: "Scattered Vaccine & Health Records",
    stat: "73% of veterinary clinics in Indonesia still use manual or Excel-based records",
    description:
      "When health data lives in silos, owners lose track and vets lose visibility.",
    source: "(Source: Indonesian Veterinary Association, 2023)",
    gradient: "from-orange-100 via-amber-50 to-yellow-100",
  },
  {
    title: "Fragmented & Unverified Pet Data",
    description:
      "There's no standardized system to verify a pet's lineage, vaccine history, or ownership — especially in developing markets. That means one thing: no real proof of authenticity or care.",
    gradient: "from-blue-100 via-sky-50 to-cyan-100",
  },
];

const solutionCards = [
  {
    title: "Immutable Lineage Record",
    description:
      "Pedigree data from certified breeders is stored directly on blockchain, verifiable anytime.",
    impact: "Eliminates up to 90% of fake pedigree cases.",
    gradient: "from-green-100 via-emerald-50 to-teal-100",
    emoji: "🧬",
  },
  {
    title: "Verified Vaccine & Health Log",
    description:
      "Veterinary clinics digitally sign every vaccination and health update — ensuring traceable, tamper-proof medical history.",
    impact: "Guarantees 100% data integrity across connected clinics.",
    gradient: "from-blue-100 via-cyan-50 to-sky-100",
    emoji: "💉",
  },
  {
    title: "NFT Pet Passport",
    description:
      "Each pet receives a unique NFT ID — containing verified lineage, vaccine, and health metadata — transferable between owners or breeders.",
    impact: "Transparency that travels with every pet.",
    gradient: "from-purple-100 via-violet-50 to-indigo-100",
    emoji: "🪪",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-1 pb-8 pt-4 sm:px-4 sm:pb-20 sm:pt-10 lg:px-6 lg:pb-24 lg:pt-12">
      {/* Hero Section */}
      <section className="rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 px-2 py-4 shadow-[0_28px_80px_rgba(244,175,208,0.35)] ring-1 ring-rose-100 sm:px-6 sm:py-12 lg:px-12 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-rose-500 ring-1 ring-white/60 sm:px-3 sm:py-1.5 sm:px-4 sm:py-2">
              Cardano Pre-Production
            </span>
            <h1 className="mt-2 text-xl font-semibold leading-tight text-pl-heading sm:text-2xl sm:mt-3 lg:text-3xl xl:text-4xl">
              Welcome to the
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">
                PetLog Crew.
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-pl-body opacity-80 sm:mt-4 sm:text-base lg:mt-6 lg:text-lg">
              Meet PetLog&apos;s warm, friendly universe before you ever connect
              a wallet. Explore the art direction, picture your cat&apos;s
              debut, and join the crew when you are ready to mint.
            </p>
            <Link
              href="/mint"
              className="mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-orange-400 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-white shadow-[0_20px_50px_rgba(244,175,208,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(244,175,208,0.55)] sm:mt-4 sm:px-6 sm:py-2.5 sm:text-sm lg:mt-6 lg:px-8 lg:py-3 lg:text-base"
            >
              Create a Paw-ssport
            </Link>
          </div>

          {/* Right Content - NFT Cards */}
          <div className="relative">
            {/* Main NFT Cards Grid */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 lg:gap-3">
              {nftCards.map((card, index) => {
                const rotations = [
                  "-rotate-2",
                  "rotate-3",
                  "rotate-1",
                  "-rotate-1",
                ];
                const margins = ["", "mt-4 sm:mt-8", "-mt-2 sm:-mt-4", ""];
                return (
                  <div
                    key={card.title}
                    className={`relative group ${margins[index]}`}
                  >
                    <div
                      className={`rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] bg-gradient-to-br ${card.gradient} p-1.5 ring-1 ring-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.12)] transform ${rotations[index]} group-hover:rotate-0 transition-all duration-300 hover:shadow-[0_28px_50px_rgba(0,0,0,0.15)] sm:p-2 lg:p-3`}
                    >
                      {/* Header */}
                      <div className="text-center mb-1.5 sm:mb-2 lg:mb-3">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-0.5">
                          PETLOG LEVEL 1
                        </p>
                        <h3 className="text-xs font-black text-gray-800 pixel-text tracking-wider sm:text-sm lg:text-base">
                          {card.title}
                        </h3>
                      </div>

                      {/* Breed & Birth Info */}
                      <div className="text-center mb-1.5 sm:mb-2 lg:mb-3">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-700 leading-tight whitespace-pre-line">
                          {card.stat.replace(" - Born ", "\n- BORN ")}
                        </p>
                      </div>

                      {/* Description Badge */}
                      <div className="rounded-md sm:rounded-lg bg-white/80 px-1.5 py-1 text-center shadow-inner sm:px-2 sm:py-1.5">
                        <p className="text-xs font-black uppercase tracking-[0.1em] text-gray-800 pixel-text whitespace-pre-line">
                          {card.description.replace(" ", "\n")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-60 animate-pulse sm:-top-1 sm:-left-1 sm:w-3 sm:h-3 lg:w-4 lg:h-4"></div>
            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-50 animate-pulse delay-700 sm:-bottom-1 sm:-right-1 sm:w-2 sm:h-2 lg:w-3 lg:h-3"></div>
            <div className="absolute top-1/2 -right-1 w-1 h-1 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-40 animate-pulse delay-1000 sm:-right-2 sm:w-1.5 sm:h-1.5 lg:-right-3 lg:w-2 lg:h-2"></div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="mt-8 sm:mt-12 lg:mt-16 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-white/80 px-2 py-6 shadow-[0_24px_60px_rgba(212,177,189,0.25)] ring-1 ring-rose-100 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
        <header className="max-w-3xl space-y-2 sm:space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
            🐾 The Problem
          </p>
          <h2 className="text-lg font-semibold text-pl-heading sm:text-2xl lg:text-3xl">
            A Broken System of Trust in Pet Ownership
          </h2>
        </header>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:mt-10 lg:grid-cols-3">
          {problemCards.map((card, index) => (
            <div
              key={card.title}
              className={`rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] bg-gradient-to-br ${card.gradient} p-3 ring-1 ring-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:p-4 lg:p-5`}
            >
              <h3 className="text-base font-semibold text-pl-heading sm:text-lg lg:text-xl">
                {card.title}
              </h3>
              {card.stat && (
                <div className="mt-2 rounded-md bg-white/70 px-2 py-1.5 sm:mt-3 sm:px-3 sm:py-2">
                  <p className="text-xs font-bold text-red-700">{card.stat}</p>
                </div>
              )}
              <p className="mt-2 text-xs leading-relaxed text-pl-body opacity-80 sm:mt-3 sm:text-sm lg:text-base">
                {card.description}
              </p>
              {card.source && (
                <p className="mt-1.5 text-xs italic text-pl-body opacity-60 sm:mt-2">
                  {card.source}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:mt-10 lg:mt-12">
          <p className="text-base italic text-pl-body opacity-70 sm:text-lg">
            💬 &ldquo;When data is fragmented, trust disappears.&rdquo;
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="mt-8 sm:mt-12 lg:mt-16 rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] bg-gradient-to-r from-rose-200/60 via-white/80 to-sky-200/60 px-2 py-6 shadow-[0_20px_60px_rgba(244,175,208,0.28)] ring-1 ring-rose-100 sm:px-4 sm:py-8 lg:px-6 lg:py-10">
        <header className="max-w-3xl space-y-2 sm:space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-500">
            💡 The Solution
          </p>
          <h2 className="text-lg font-semibold text-pl-heading sm:text-2xl lg:text-3xl">
            PetLog — A Decentralized Trust Layer for Pets
          </h2>
        </header>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:mt-10 lg:grid-cols-3">
          {solutionCards.map((card, index) => (
            <div
              key={card.title}
              className={`rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] bg-gradient-to-br ${card.gradient} p-3 ring-1 ring-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:p-4 lg:p-5`}
            >
              <div className="flex items-center gap-1.5 mb-2 sm:gap-2 sm:mb-3">
                <span className="text-lg sm:text-xl">{card.emoji}</span>
                <h3 className="text-base font-semibold text-pl-heading sm:text-lg lg:text-xl">
                  {card.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-pl-body opacity-80 mb-2 sm:text-sm sm:mb-3 lg:text-base">
                {card.description}
              </p>
              <div className="rounded-md bg-white/70 px-2 py-1.5 sm:px-3 sm:py-2">
                <p className="text-xs font-bold text-green-700">
                  {card.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Validator Network Section */}
        <div className="mt-6 rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 p-3 ring-1 ring-white/70 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:mt-8 sm:p-4 lg:mt-10 lg:p-6">
          <div className="flex items-center gap-1.5 mb-2 sm:gap-2 sm:mb-3">
            <span className="text-lg sm:text-xl">🔗</span>
            <h3 className="text-base font-semibold text-pl-heading sm:text-lg lg:text-xl">
              Validator Network
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-pl-body opacity-80 mb-3 sm:text-base sm:mb-4 lg:text-lg">
            Pedigree associations and veterinary clinics act as trusted
            validators in the ecosystem, creating a decentralized network of
            verified pet data.
          </p>
          <div className="rounded-md bg-white/70 px-3 py-2 sm:px-4 sm:py-3">
            <p className="text-xs font-bold text-purple-700 sm:text-sm lg:text-base">
              Building a trusted digital identity layer for the pet industry.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center sm:mt-8 lg:mt-10">
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-pl-heading shadow-[0_20px_50px_rgba(244,175,208,0.45)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(244,175,208,0.55)] sm:px-8 sm:py-3 sm:text-sm lg:px-10 lg:text-base"
          >
            Start Building Trust
          </Link>
        </div>
      </section>
    </div>
  );
}
