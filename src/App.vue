<template>
  <nav class="container mx-auto max-w-screen-lg py-6">
    <div class="flex">
      <h1 class="font-semibold text-xl mr-8">ForMinimaLat🎨r</h1>
      <RouterLink
        class="underline mr-4 underline-offset-8"
        active-class="text-blue-500"
        to="/"
        >Form Builder</RouterLink
      >
      <RouterLink
        class="underline underline-offset-8"
        active-class="text-blue-500"
        to="/forms"
        >My Forms</RouterLink
      >
    </div>
  </nav>
  <main class="container max-w-screen-lg mx-auto">
    <RouterView />
  </main>
</template>

<script setup></script>
