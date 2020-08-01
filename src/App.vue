<template>
  <div id="app" class="flex flex-col min-h-screen">
    <px-header />
    <main class="flex-grow min-h-full">
      <router-view />
    </main>
    <px-footer />
  </div>
</template>
<script>
import PxHeader from "@/components/PxHeader";
import PxFooter from "@/components/PxFooter";
export default {
  name: "App",
  components: { PxHeader, PxFooter },
};
</script>
<style>
*:focus {
  outline: none;
}
html,
body {
  font-family: "Open Sans", sans-serif;
  background-color: #151619;
  color: #fff;
}
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>
