import type { MintDropParams } from './types'
import { useDrop } from '@/components/drops/useDrops'

export function execMintDrop({
  item,
  api,
  executeTransaction,
  isLoading,
}: MintDropParams) {
  const { drop } = useDrop()
  const { toMintNFTs } = storeToRefs(useDropStore())
  const { accountId } = useAuth()
  const nftsMetadata = computed(() => {
    return toMintNFTs.value.map((nft) => {
      return {
        chain: drop.value.chain,
        collection: drop.value.collection,
        metadata: nft.metadata,
      }
    })
  })

  const args = toMintNFTs.value.map((allocatedNft, index) =>
    api.tx.nfts.mint(item.collectionId, allocatedNft.nft, accountId.value, {
      ownedItem: (item.availableSerialNumbers || [])[index] || null,
      mintPrice: item.price || null,
    }),
  )
  args.push(api.tx.system.remark(JSON.stringify(nftsMetadata.value)))
  isLoading.value = true

  executeTransaction({
    cb: api.tx.utility.batchAll,
    arg: [args],
  })
}
