<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <p class="font-bold text-2xl">UJIKOM|2025</p>
        </NuxtLink>
      </template>
      
      <template #right>
        <p class="font-bold text-2xl">UNIKOM</p>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>

<script setup>
const title = "UJIKOM-2025";

// const description =
//   "A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.";
// const { data } = await useFetch("/api/hello");
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});
useSeoMeta({
  title,
  // description,
  // ogTitle: title,
  // ogDescription: description,
  // ogImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  // twitterImage: "https://ui.nuxt.com/assets/templates/nuxt/starter-light.png",
  // twitterCard: "summary_large_image",
});
</script>
