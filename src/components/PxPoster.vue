<template>
  <div class="w-32 mx-4">
    <div
      class="img-container h-full rounded-sm shadow-md text-center"
      @click="open(movie.id)"
    >
      <img
        v-if="movie.poster_path != null"
        :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
        alt=""
        class="rounded-sm"
      />
      <img
        v-else
        src="https://i.imgur.com/Dz4sqyH.png"
        alt=""
        class="rounded-sm"
      />
      <div class="description rounded-sm flex flex-col justify-between">
        <div class="flex justify-between m-2">
          <font-awesome-icon
            icon="heart"
            class="opacity-75 hover:text-blue-500 hover:opacity-100"
          />
          <font-awesome-icon
            icon="eye"
            class="opacity-75 hover:text-blue-500 hover:opacity-100"
          />
        </div>
        <div class="text-sm font-semibold flex justify-between">
          <PxStarRank :rank="movie.vote_average" />
          <p>{{ movie.vote_average }}/10</p>
        </div>
      </div>
    </div>
    <h2 id="title" class="font-semibold text-xs">{{ movie.title }}</h2>
    <span class="font-semibold text-xs text-gray-500">{{
      new Date(movie.release_date).getFullYear()
    }}</span>
  </div>
</template>
<script>
import PxStarRank from "@/components/PxStarRank";
export default {
  name: "PxPoster",
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
  components: { PxStarRank },
  methods: {
    open(id) {
      this.$router.push({
        name: "Movie",
        params: {
          id: id,
        },
      });
    },
  },
};
</script>
<style scoped>
#title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.img-container {
  position: relative;
  width: 100%;
  height: auto;
}
.description {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: #fff;
  border: 3px solid #4299e1;
  visibility: hidden;
  opacity: 0;

  /* transition effect. not necessary */
  transition: opacity 0.2s, visibility 0.2s;
}

.img-container:hover .description {
  visibility: visible;
  opacity: 1;
}
</style>
