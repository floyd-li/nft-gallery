import { type Prefix } from '@kodadot1/static'
import { blockExplorerOf } from '@/utils/config/chain.config'

export default function () {
  const getExplorerUrl = (urlPrefix: string, hash: string, prefix: Prefix) =>
    `${blockExplorerOf(prefix)}${urlPrefix}/${hash}`

  const getAccountUrl = (hash: string, prefix: Prefix) =>
    getExplorerUrl('account', hash, prefix)

  const getExtrinsicUrl = (hash: string, prefix: Prefix) =>
    getExplorerUrl('extrinsic', hash, prefix)

  const getBlockUrl = (blockId: string, prefix: Prefix) => {
    const urlPrefix = 'block'
    return getExplorerUrl(urlPrefix, blockId, prefix)
  }

  return {
    getAccountUrl,
    getExtrinsicUrl,
    getBlockUrl,
  }
}
