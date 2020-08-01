<template>
  <div class="dropdown">
    <button
      ref="btnDropdown"
      @click="toggleMenu"
      class=" text-gray-500 font-semibold text-sm px-5 border-b-4 hover:text-white py-1 border-transparent"
    >
      {{ name }}
      <span class="text-blue-500 ml-3">{{ select }} </span>
      <font-awesome-icon icon="sort-down" class="ml-1 sortIcon" />
    </button>
    <div
      ref="menuDropdown"
      id="menuDropdown"
      v-bind:class="{ hidden: !menuShow, block: menuShow }"
      class="w-48 text-gray-500 bg-blue-900 z-10 h-8"
    >
      <ul>
        <li v-for="item in data" :key="item.id">
          <button
            @click="sendChange(item)"
            class="font-semibold text-sm text-left w-full py-1 hover:bg-blue-900 pl-5 border-l-4 border-transparent hover:border-blue-600 focus:text-white focus:border-gray-300"
          >
            {{ item.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Popper from "popper.js";
export default {
  name: "PxDropDown",
  data() {
    return {
      menuShow: false,
      select: this.data[0].name
    };
  },
  props: {
    name,
    data: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    toggleMenu() {
      if (this.menuShow) {
        this.menuShow = false;
      } else {
        this.menuShow = true;
        new Popper(this.$refs.btnDropdown, this.$refs.menuDropdown, {
          placement: "bottom-start"
        });
      }
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.menuShow = false;
      }
    },
    sendChange(item) {
      this.select = item.name;
      this.$emit("change", { id: item.id, name: this.name });
    }
  }
};
</script>
<style scoped>
#menuDropdown ul {
  background-color: #17181b;
}
</style>
