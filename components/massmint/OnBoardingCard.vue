<template>
  <div
    class="carousel-card p-7 mobile-padding"
    :class="{ 'not-active': !active }"
  >
    <div class="card__content">
      <div class="flex justify-between">
        <p class="title text-xl sm:text-3xl capitalize">
          {{ title }}
        </p>
        <span class="text-2xl">{{ count }}</span>
      </div>
      <slot>
        <div class="content text-xl/[1.5] sm:text-base/[1.5]">
          <Markdown :source="content" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  count?: string
  content?: string
  active?: boolean
}>()
</script>

<style scoped lang="scss">
@import '@/assets/styles/abstracts/variables';

.carousel-card {
  flex: 0 0 var(--card-width);
  min-height: var(--card-height);

  &.mobile-padding {
    @include mobile {
      padding: 0.75rem !important;
    }
  }
  @include ktheme() {
    box-shadow: theme('primary-shadow');
    background: theme('background-color');
    border: 1px solid theme('border-color');
  }
  .card__content {
    @include ktheme() {
      color: theme('text-color') !important;
    }
    .content {
      @include ktheme() {
        color: theme('text-color') !important;
      }
      @include tablet {
        font-size: 1.25rem !important;
      }

      :deep(a) {
        @include ktheme() {
          color: theme('k-blue') !important;
        }
      }
    }
  }
  &.not-active {
    opacity: 0.5;
  }
}
</style>
