<template>
  <NeoButton
    :variant="variant"
    :no-shadow="noShadow"
    @click="toggleWalletConnectModal"
  >
    <slot>
      {{ $t(`${label || 'general.connect'}`) }}
    </slot>
  </NeoButton>
</template>

<script lang="ts" setup>
import type { NeoButtonVariant } from '@kodadot1/brick'
import { NeoButton } from '@kodadot1/brick'
import { ConnectWalletModalConfig } from '../common/ConnectWallet/useConnectWallet'
import { ModalCloseType } from '../navbar/types'

defineProps<{
  label?: string
  variant?: NeoButtonVariant
  noShadow?: boolean
}>()

const { neoModal } = useProgrammatic()

const modal = ref<{ close: () => void, isActive?: boolean } | null>(null)
const isMobile = ref(window.innerWidth < 1024)
const isMobileWithoutTablet = ref(window.innerWidth < 768)
const emit = defineEmits(['closeBurgerMenu', 'toggleConnectModal'])

const toggleWalletConnectModal = () => {
  if (isMobile.value) {
    emit('closeBurgerMenu')
  }
  else {
    emit('toggleConnectModal')
  }

  neoModal.closeAll()

  if (modal.value?.isActive) {
    modal.value = null
    return
  }

  const modalInstance = neoModal.open({
    ...ConnectWalletModalConfig,
    ...(isMobileWithoutTablet.value ? { animation: 'none' } : {}),
    onClose: (type: ModalCloseType) => {
      if (isMobile.value && type === ModalCloseType.BACK) {
        emit('closeBurgerMenu')
      }
    },
  })
  modal.value = modalInstance
}
</script>
