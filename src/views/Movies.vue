<template>
  <div class="m-2 flex flex-col justify-center items-center">
    <div
      id="movies"
      class="w-full flex flex-row flex-wrap  justify-between items-center"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <div class="" v-for="movie in movies" :key="movie.id">
        <px-poster :movie="movie" />
      </div>
    </div>
    <div class="flex justify-center">
      <clip-loader :loading="loading" :color="'#4299e1'" :size="100">
      </clip-loader>
    </div>
  </div>
</template>

<script>
var count = 1;
import api from "@/api";
import PxPoster from "@/components/PxPoster";
export default {
  name: "Movies",
  components: { PxPoster },
  data() {
    return {
      loading: false,
      movies: [],
      busy: false,
      genre: "All",
      sort: "popularity.desc",
    };
  },
  watch: {
    "$route.params.genre"() {
      this.changeList();
    },
    "$route.params.sort"() {
      this.changeList();
    },
  },
  created() {
    this.changeList();
  },
  methods: {
    changeList() {
      this.loading = true;
      this.movies = [];
      this.$route.params.genre != undefined
        ? (this.genre = this.$route.params.genre)
        : (this.genre = "All");
      this.$route.params.sort != undefined
        ? (this.sort = this.$route.params.sort)
        : (this.sort = "popularity.desc");
      Promise.all([
        api.getMovies(1, this.genre, this.sort),
        api.getMovies(2, this.genre, this.sort),
        api.getMovies(3, this.genre, this.sort),
      ])
        .then(([page1, page2, page3]) => {
          this.movies = this.movies.concat(page1, page2, page3);
        })
        .finally(() => {
          this.$nextTick(() => {
            this.loading = false;
          });
        });
      count = 4;
    },
    loadMore() {
      this.busy = true;
      api
        .getMovies(count, this.genre, this.sort)
        .then((page) => (this.movies = this.movies.concat(page)));
      this.busy = false;
      count++;
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
