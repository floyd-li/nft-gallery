<template v-else>
  <div :class="{ 'flex items-center': showBadge }">
    <NeoIcon
      v-if="showBadge"
      icon="badge-check"
      class="mr-1"
      pack="fass"
      size="small"
    />

    <span
      v-if="showOnchainIdentity"
      class="inline-flex items-center"
    >
      {{ shortenedAddress }}
      <img
        v-if="isFetchingIdentity"
        src="~/assets/svg/infinity.svg"
        class="ml-1 infinity-loader"
      >
      <template v-else>
        <span
          v-if="display && !hideDisplayName"
          class="ml-1"
        >
          ({{ display }})
        </span>
      </template>
    </span>
    <template v-else-if="!hideIdentityPopover && !isMobileDevice">
      <IdentityPopover v-if="address">
        <template #content>
          <span data-testid="collection-nft-holder-identity">{{ name }}</span>
        </template>
      </IdentityPopover>
    </template>
    <span v-else>
      {{ name }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { GenericAccountId } from '@polkadot/types/generic/AccountId'
import { NeoIcon } from '@kodadot1/brick'
import IdentityPopover from './IdentityPopover.vue'
import { isMobileDevice } from '@/utils/extension'

type Address = string | GenericAccountId | undefined

defineProps<{
  showOnchainIdentity?: boolean
  hideIdentityPopover?: boolean
  isFetchingIdentity?: boolean
  showClipboard?: boolean
  showBadge?: boolean
  address?: Address
  display?: string
  shortenedAddress?: string
  name?: string | object
  hideDisplayName?: boolean
}>()
</script>

<style scoped>
.infinity-loader {
  height: 20px;
}
</style>
