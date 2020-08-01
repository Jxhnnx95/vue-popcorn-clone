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

  <!---->
</template>

<script>
var count = 1;
import api from "@/api";
import PxPoster from "@/components/PxPoster";
export default {
  name: "Home",
  components: { PxPoster },
  data() {
    return {
      movies: [],
      loading: false,
      busy: false,
      genre: "All",
      sort: "popularity.desc"
    };
  },
  created() {
    this.loading = true;
    Promise.all([
      api.getMovies(1, this.genre, this.sort),
      api.getMovies(2, this.genre, this.sort),
      api.getMovies(3, this.genre, this.sort)
    ])
      .then(([page1, page2, page3]) => {
        this.movies = this.movies.concat(page1, page2, page3);
      })
      .finally(() =>
        this.$nextTick(() => {
          this.loading = false;
        })
      );

    count++;
  },
  methods: {
    loadMore() {
      this.loading = true;
      this.busy = true;
      api
        .getMovies(count, this.genre, this.sort)
        .then(page => (this.movies = this.movies.concat(page)))
        .finally(() =>
          this.$nextTick(() => {
            this.loading = false;
          })
        );
      this.busy = false;
      count++;
    }
  }
};
</script>
