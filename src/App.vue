<template>
  <nav class="container mx-auto max-w-screen-lg py-6 px-4">
    <div class="flex items-center">
      <h1 class="font-semibold text-xl mr-8">ForMinimaL</h1>
      <RouterLink
        class="mr-4 whitespace-nowrap"
        active-class="text-indigo-700"
        to="/"
        >Builder</RouterLink
      >
      <RouterLink
        class="whitespace-nowrap"
        active-class="text-indigo-700"
        to="/forms"
        >Forms</RouterLink
      >
    </div>
  </nav>
  <main class="container max-w-screen-lg mx-auto px-4">
    <RouterView />
  </main>
</template>

<script setup></script>
