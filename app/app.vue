<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <p class="font-bold text-2xl">UJIKOM | 2025</p>
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
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});
useSeoMeta({
  title,
});
</script>
