export const Footer = () => {
  return (
    <footer className="mt-6 sm:mt-8 lg:mt-12 rounded-t-[16px] sm:rounded-t-[20px] lg:rounded-t-[24px] bg-gradient-to-b from-gray-50 to-white px-2 py-4 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] ring-1 ring-gray-100 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2 md:justify-start">
            <img
              src="/petlog-logo.png"
              alt="PetLog"
              className="h-5 w-auto sm:h-6 lg:h-8"
            />
            <p className="text-xs sm:text-sm lg:text-base text-pl-body opacity-70">
              © {new Date().getFullYear()} PetLog. All rights reserved.
            </p>
          </div>
          <div className="rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-1 ring-1 ring-blue-200 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Built for Cardano Pre-Production
            </p>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 lg:mt-6 pt-2 sm:pt-3 lg:pt-4 border-t border-gray-200">
          <p className="text-center text-xs text-pl-body opacity-60 leading-relaxed">
            Level 1 Self-Attested Certificates • Powered by Blockchain
            Technology
          </p>
        </div>
      </div>
    </footer>
  );
};
