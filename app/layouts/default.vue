<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main id="contenu" class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <CookieConsent />
  </div>
</template>
