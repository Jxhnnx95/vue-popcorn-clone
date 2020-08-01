<template>
  <div class="flex justify-start">
    <div v-for="(s, i) in stars" :key="i">
      <font-awesome-icon v-if="s == 1" icon="star" class="text-yellow-500" />
      <font-awesome-icon
        v-else-if="s == 0.5"
        icon="star-half"
        class="text-yellow-500"
      />
      <font-awesome-icon v-else icon="star" class="text-gray-500" />
    </div>
  </div>
</template>
<script>
export default {
  name: "PxStarRank",
  props: {
    rank: {
      type: Number,
      default: () => []
    }
  },
  data() {
    return {
      stars: []
    };
  },

  created() {
    let number = (this.rank * 10) / 20;
    if (number < 1) {
      this.stars = ["0", "0", "0", "0", "0"];
    } else if (number == 1) {
      this.stars = ["1", "0", "0", "0", "0"];
    } else if (number > 1 && number < 2) {
      this.stars = ["1", ".5", "0", "0", "0"];
    } else if (number == 2) {
      this.stars = ["1", "1", "0", "0", "0"];
    } else if (number > 2 && number < 3) {
      this.stars = ["1", "1", ".5", "0", "0"];
    } else if (number == 3) {
      this.stars = ["1", "1", "1", "0", "0"];
    } else if (number > 3 && number < 4) {
      this.stars = ["1", "1", "1", ".5", "0"];
    } else if (number == 4) {
      this.stars = ["1", "1", "1", "1", "0"];
    } else if (number > 4 && number < 5) {
      this.stars = ["1", "1", "1", "1", ".5"];
    } else {
      this.stars = ["1", "1", "1", "1", "1"];
    }
  }
};
</script>
