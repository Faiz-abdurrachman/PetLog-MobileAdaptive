import { NFTGallery } from "../components/NFTGallery"
import Link from "next/link"
import { PawPrint, Heart } from "lucide-react"

const MyPassportsPage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-6 pt-6 sm:space-y-8 sm:pt-8">
      {/* Header Section */}
      <section className="rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 px-4 py-8 shadow-[0_28px_80px_rgba(244,175,208,0.35)] ring-1 ring-rose-100 sm:px-6 sm:py-10 lg:px-6 lg:py-12">
        <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:gap-6 lg:text-left">
          <div className="space-y-3 max-w-2xl sm:space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.4em] text-purple-600 ring-1 ring-purple-200 sm:px-4 sm:py-2">
              <Heart size={12} className="sm:w-[14px] sm:h-[14px]" />
              My Collection
            </span>
            <h1 className="text-3xl font-semibold text-pl-heading sm:text-4xl lg:text-5xl">My Pet Crew</h1>
            <p className="text-base leading-relaxed text-pl-body opacity-80 sm:text-lg">
              Connect your Eternl wallet to view your Digital Pet Passports on the Cardano Pre-Production network. 
              Your pet's digital identity, secured forever on blockchain.
            </p>
          </div>
          
          <Link
            href="/mint"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-1 shadow-[0_20px_60px_rgba(168,85,247,0.4)] transition-all duration-300 hover:shadow-[0_30px_80px_rgba(168,85,247,0.6)] hover:-translate-y-1 sm:gap-3"
          >
            <div className="rounded-full bg-white px-6 py-3 text-sm font-bold text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text uppercase tracking-[0.2em] transition-all duration-300 group-hover:from-purple-700 group-hover:via-pink-700 group-hover:to-rose-700 sm:px-8 sm:py-4 sm:text-base">
              <div className="flex items-center gap-2 sm:gap-3">
                <PawPrint size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Create New Passport</span>
                <span className="sm:hidden">Create</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-white/80 px-4 py-6 shadow-[0_24px_60px_rgba(212,177,189,0.25)] ring-1 ring-rose-100 sm:px-6 sm:py-8">
        <NFTGallery apiKey={process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID} />
      </section>
    </div>
  )
}

export default MyPassportsPage


