<template>
  <div>
    <section class="instance">
      <LandingHeroBanner />
    </section>

    <template v-if="showCarousel">
      <!-- top collections -->
      <section
        v-if="showTopCollections"
        class="py-8 instance"
      >
        <div class="container is-fluid">
          <LandingTopCollections class="my-5" />
        </div>
      </section>

      <section class="py-8 instance">
        <div class="container is-fluid">
          <!-- generative  -->
          <LazyCarouselTypeGenerative />
        </div>
      </section>

      <section class="py-8 instance">
        <div class="container is-fluid">
          <!-- latest sales -->
          <LazyCarouselTypeLatestSales />

          <!-- new listings -->
          <LazyCarouselTypeNewestList class="mt-8" />
        </div>
      </section>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Prefix } from '@kodadot1/static'

const hiddenCarrouselPrefixes: Prefix[] = ['dot']
const forbiddenPrefixesForTopCollections: Prefix[] = ['ksm', 'dot', 'imx']

const { urlPrefix } = usePrefix()

// currently only supported on rmrk
const showCarousel = computed(
  () => !hiddenCarrouselPrefixes.includes(urlPrefix.value),
)
const showTopCollections = computed(
  () => !forbiddenPrefixesForTopCollections.includes(urlPrefix.value),
)
</script>
