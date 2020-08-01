<template>
  <div
    class="h-screen w-screen flex flex-col items-center justify-center bg-teal-lightest font-sans"
  >
    <div
      class="h-screen w-full absolute flex items-center justify-center bg-modal"
    >
      <div
        class="bg-white text-gray-900 rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll"
      >
        <div class="mb-4">
          <h1>{{ modalTitle }}</h1>
        </div>
        <div class="mb-8">
          <slot name="body"></slot>
        </div>
        <div class="flex justify-center">
          <button
            class="flex-no-shrink text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-600"
            v-on:click="closeModal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PxModal",
  props: ["modalTitle"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped></style>
