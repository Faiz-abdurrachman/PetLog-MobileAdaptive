import Image from "next/image";

interface NFTAttribute {
  trait_type: string;
  value: string;
}

interface NFTMetadata {
  name: string;
  image: string;
  description: string;
  attributes?: NFTAttribute[];
}

interface NFTCardProps {
  metadata: NFTMetadata;
  assetId: string;
  policyId: string;
}

const resolveIpfsUrl = (ipfsUrl: string): string | null => {
  if (!ipfsUrl || !ipfsUrl.startsWith("ipfs://")) {
    return null;
  }

  const cid = ipfsUrl.replace("ipfs://", "");
  const gateway =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY ??
    "https://purple-persistent-booby-135.mypinata.cloud/ipfs/";
  return `${gateway}${cid}`;
};

export const NFTCard = ({ metadata, assetId, policyId }: NFTCardProps) => {
  const imageUrl = resolveIpfsUrl(metadata.image);

  return (
    <article className="group rounded-[12px] sm:rounded-[16px] lg:rounded-[20px] bg-white shadow-[0_12px_24px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={metadata.name || "PetLog NFT"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-2xl mb-1 sm:text-3xl lg:text-4xl sm:mb-2">
                🐾
              </div>
              <div className="text-xs">No image</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4 lg:gap-4 lg:p-6">
        <header className="space-y-1">
          <h3 className="text-sm font-semibold text-pl-heading sm:text-base lg:text-lg">
            {metadata.name}
          </h3>
          <p className="break-all text-xs font-mono text-gray-500 bg-gray-50 rounded-md px-2 py-1">
            {assetId}
          </p>
        </header>

        {metadata.description && (
          <p className="text-xs leading-relaxed text-pl-body opacity-80">
            {metadata.description}
          </p>
        )}

        {metadata.attributes && metadata.attributes.length > 0 && (
          <dl className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
            {metadata.attributes.map((attr, index) => (
              <div
                key={`${attr.trait_type}-${index}`}
                className="rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 px-2 py-1.5 ring-1 ring-blue-100 sm:px-3 sm:py-2"
              >
                <dt className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                  {attr.trait_type}
                </dt>
                <dd className="mt-0.5 text-xs font-semibold text-pl-heading">
                  {attr.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <footer className="mt-auto rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-2 ring-1 ring-purple-100 sm:p-3">
          <div className="text-xs font-medium text-purple-600 uppercase tracking-wider">
            Policy ID
          </div>
          <div className="mt-0.5 break-all font-mono text-xs text-gray-600">
            {policyId}
          </div>
        </footer>
      </div>
    </article>
  );
};
