import Link from "next/link";

import { C } from "lucid-cardano";

import { PawPrint } from "lucide-react";

import { useCallback, useEffect, useMemo, useState } from "react";

type NFTGalleryProps = {
  apiKey?: string;
};

type WalletState = {
  address: string;

  stakeAddress: string | null;

  connected: boolean;
};

type AssetMetadata = {
  assetId: string;

  name: string;

  description: string;

  image: string | null;
};

type FetchState = {
  loading: boolean;

  error: string | null;
};

const fromHex = (hex: string): Uint8Array =>
  new Uint8Array(hex.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) ?? []);

const decodeEternlAddress = (hex: string) => {
  const address = C.Address.from_bytes(fromHex(hex));

  const networkId = address.network_id();

  const paymentHrp = networkId === 1 ? "addr" : "addr_test";

  const stakeHrp = networkId === 1 ? "stake" : "stake_test";

  const base = C.BaseAddress.from_address(address);

  if (base) {
    const payment = base.to_address().to_bech32(paymentHrp);

    const stakeAddr = C.RewardAddress.new(networkId, base.stake_cred())
      .to_address()
      .to_bech32(stakeHrp);

    return { payment, stake: stakeAddr };
  }

  const reward = C.RewardAddress.from_address(address);

  if (reward) {
    const stakeHrp2 = networkId === 1 ? "stake" : "stake_test";

    return { payment: "", stake: reward.to_address().to_bech32(stakeHrp2) };
  }

  const enterprise = C.EnterpriseAddress.from_address(address);

  if (enterprise)
    return {
      payment: enterprise.to_address().to_bech32(paymentHrp),
      stake: null,
    };

  const pointer = C.PointerAddress.from_address(address);

  if (pointer)
    return { payment: pointer.to_address().to_bech32(paymentHrp), stake: null };

  const byron = C.ByronAddress.from_address(address);

  if (byron) return { payment: byron.to_base58(), stake: null };

  return { payment: address.to_bech32(paymentHrp), stake: null };
};

const ipfsToGateway = (url: string | null) => {
  if (!url) return null;

  // Already http and not a known gateway? pass through

  if (!url.startsWith("ipfs://")) {
    // Guard obvious bad cases

    if (url.endsWith("/undefined") || url.endsWith("/null")) return null;

    return url;
  }

  const stripped = url.replace("ipfs://", "").replace(/^ipfs\//i, "");

  if (
    !stripped ||
    stripped.toLowerCase() === "undefined" ||
    stripped.toLowerCase() === "null"
  )
    return null;

  const gateway =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY ?? "https://ipfs.io/ipfs/";

  return `${gateway}${stripped}`;
};

const addressesEndpoint = (address: string, page = 1, count = 100) =>
  `https://cardano-preprod.blockfrost.io/api/v0/addresses/${encodeURIComponent(
    address
  )}/assets?page=${page}&count=${count}`;

const accountEndpoint = (stakeAddress: string, page = 1, count = 100) =>
  `https://cardano-preprod.blockfrost.io/api/v0/accounts/${encodeURIComponent(
    stakeAddress
  )}/addresses/assets?page=${page}&count=${count}`;

const assetEndpoint = (assetId: string) =>
  `https://cardano-preprod.blockfrost.io/api/v0/assets/${assetId}`;

const fetchPaginatedAssets = async (
  urlBuilder: (page: number, count: number) => string,
  projectId: string
) => {
  const results: Array<{ unit: string; quantity: string }> = [];

  let page = 1;

  const count = 100;

  while (true) {
    const response = await fetch(urlBuilder(page, count), {
      headers: { project_id: projectId },
    });

    if (response.status === 404) {
      return results;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch assets. (${response.status})`);
    }

    const chunk: Array<{ unit: string; quantity: string }> =
      await response.json();

    results.push(...chunk);

    if (chunk.length < count) {
      break;
    }

    page += 1;
  }

  return results;
};

const fetchAssetDetail = async (assetUnit: string, projectId: string) => {
  const response = await fetch(assetEndpoint(assetUnit), {
    headers: { project_id: projectId },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch asset ${assetUnit}`);
  }

  return response.json();
};

export const NFTGallery = ({ apiKey }: NFTGalleryProps) => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: "",
    stakeAddress: null,
  });

  const [assets, setAssets] = useState<AssetMetadata[]>([]);

  const [state, setState] = useState<FetchState>({
    loading: false,
    error: null,
  });

  const projectId = useMemo(
    () =>
      apiKey ??
      process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID ??
      process.env.BLOCKFROST_PROJECT_ID,

    [apiKey]
  );

  const connectWallet = useCallback(async () => {
    setState({ loading: true, error: null });

    try {
      const provider = (window as any)?.cardano?.eternl;

      if (!provider) {
        throw new Error(
          "Eternl wallet is not available. Please install or enable it."
        );
      }

      const api = await provider.enable();

      const change = await api.getChangeAddress?.();

      const base = await api.getBaseAddress?.();

      const reward = (await api.getRewardAddresses?.())?.[0];

      const used = (await api.getUsedAddresses?.())?.[0];

      const hexAddress = change ?? base ?? reward ?? used;

      if (!hexAddress) {
        throw new Error("No addresses found in Eternl wallet.");
      }

      const { payment, stake } = decodeEternlAddress(hexAddress);

      setWallet({ connected: true, address: payment, stakeAddress: stake });

      setState({ loading: false, error: null });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to connect wallet";

      setState({ loading: false, error: message });
    }
  }, []);

  useEffect(() => {
    const fetchAssets = async () => {
      if (!wallet.connected || !wallet.address || !projectId) return;

      setState({ loading: true, error: null });

      try {
        const holdings = wallet.stakeAddress
          ? await fetchPaginatedAssets(
              (page, count) =>
                accountEndpoint(wallet.stakeAddress!, page, count),
              projectId
            )
          : await fetchPaginatedAssets(
              (page, count) => addressesEndpoint(wallet.address, page, count),
              projectId
            );

        if (holdings.length === 0) {
          setAssets([]);

          setState({ loading: false, error: null });

          return;
        }

        const detailResults = await Promise.all(
          holdings.map(async (h) => {
            const assetUnit = (h as any).unit ?? (h as any).asset;

            const qtyStr = (h as any).quantity ?? "0";

            if (!assetUnit) return null;

            try {
              if (BigInt(qtyStr) === 0n) return null;
            } catch {}

            try {
              const detailJson = await fetchAssetDetail(assetUnit, projectId);

              if (!detailJson) return null;

              const metadata = detailJson.onchain_metadata ?? {};

              return {
                assetId: assetUnit,

                name: metadata.name ?? assetUnit,

                description: metadata.description ?? "",

                image: ipfsToGateway(metadata.image ?? null),
              } satisfies AssetMetadata;
            } catch (error) {
              console.warn(`Skipping asset ${assetUnit}:`, error);

              return null;
            }
          })
        );

        const filtered = detailResults.filter(Boolean) as AssetMetadata[];

        setAssets(filtered);

        setState({ loading: false, error: null });
      } catch (error) {
        console.error(error);

        const message =
          error instanceof Error ? error.message : "Unable to load NFTs";

        setState({ loading: false, error: message });
      }
    };

    fetchAssets();
  }, [wallet, projectId]);

  if (!wallet.connected) {
    return (
      <div className="pixel-card bg-pl-card p-8 text-center">
        <h2 className="font-display text-xl tracking-[0.2em] text-pl-heading">
          Connect Eternl Wallet
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-pl-body">
          Grant access to display NFTs owned by your wallet.
        </p>

        <button
          onClick={connectWallet}
          className="mt-6 pixel-btn pixel-btn--primary px-6 py-3 text-base uppercase tracking-[0.3em]"
        >
          Connect Eternl Wallet
        </button>

        {state.error && (
          <p className="mt-4 text-sm text-[color:var(--color-danger)]">
            {state.error}
          </p>
        )}
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="yarn-ball" />

        <p className="mt-3 text-sm text-pl-muted">
          Chasing the yarn… fetching your crew
        </p>
      </div>
    );
  }

  if (state.error) {
    return (
      <p className="text-center text-[color:var(--color-danger)]">
        {state.error}
      </p>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="pixel-card mx-auto max-w-xl bg-pl-card p-8 text-center">
        <h2 className="font-display text-2xl tracking-[0.2em] text-pl-heading">
          Your crew is waiting!
        </h2>

        <p className="mt-2 text-lg leading-relaxed text-pl-body">
          Create the first Digital Paw-ssport for your cat.
        </p>

        <Link
          href="/mint"
          className="mt-6 inline-flex items-center justify-center gap-2 pixel-btn pixel-btn--secondary px-6 py-3 text-base uppercase tracking-[0.3em]"
        >
          <PawPrint size={16} /> Create New Paw-ssport
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {assets.map((asset) => (
        <Link
          key={asset.assetId}
          href={`/asset/${encodeURIComponent(asset.assetId)}`}
          className="block text-left"
        >
          <article className="pixel-card flex h-full flex-col bg-pl-card transition">
            <div className="relative aspect-square w-full overflow-hidden border-b border-pl-borderStrong bg-pl-surface">
              {asset.image ? (
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-pl-muted">
                  No image
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
              <h3 className="font-display text-base tracking-[0.18em] text-pl-heading sm:text-lg">
                {asset.name}
              </h3>

              {asset.description && (
                <p className="line-clamp-2 text-xs leading-relaxed text-pl-body sm:text-sm">
                  {asset.description}
                </p>
              )}

              <p className="mt-auto break-all text-xs font-mono uppercase tracking-[0.3em] text-pl-muted">
                {asset.assetId}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};
