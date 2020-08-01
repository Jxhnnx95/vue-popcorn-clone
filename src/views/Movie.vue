<template>
  <div class="">
    <div class="flex justify-center">
      <clip-loader :loading="loading" :color="'#4299e1'" :size="100">
      </clip-loader>
    </div>
    <div class="img-container h-full rounded-sm shadow-md text-center">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
        alt=""
        class="img-backdrop rounded-sm"
      />

      <div
        class="description pl-20 pr-5 pb-40 pt-4 rounded-sm flex justify-between"
      >
        <div id="poster" class="w-3/12">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            alt=""
            class="rounded-sm"
          />
        </div>
        <div
          id="info-container"
          class="text-sm pl-4 w-8/12 text-left font-semibold flex flex-col  justify-between"
        >
          <div id="info">
            <h1 class="font-semibold text-4xl">{{ movie.title }}</h1>
            <div class="flex justify-between items-center">
              <div class="my-4 flex justify-start items-center">
                <span class="mr-3">{{
                  new Date(movie.release_date).getFullYear()
                }}</span>
                <span class="mr-3 text-xs">&#9679;</span>
                <span class="mr-3">{{ movie.runtime }} min</span>
                <span class="mr-3 text-xs">&#9679;</span>
                <span class="mr-3"
                  ><span v-for="g in movie.genres" :key="g.id"
                    >{{ g.name }}/</span
                  ></span
                >
                <span class="mr-3 text-xs">&#9679;</span>
                <a
                  :href="`https://www.imdb.com/title/${movie.imdb_id}/`"
                  target="_blank"
                  class="mr-3"
                  ><img src="@/assets/imdb.png"
                /></a>
                <span class="mr-3 text-xs">&#9679;</span>
                <px-star-rank :rank="Number(movie.vote_average)" />
              </div>
              <div>
                <font-awesome-icon icon="magnet" class=" text-white mr-2" />
                <font-awesome-icon icon="circle" class="text-teal-400" />
              </div>
            </div>
            <p class="text-justify">{{ movie.overview }}</p>
          </div>
          <div class="flex justify-between">
            <div class="flex flex-col">
              <div class="flex justify-start items-center">
                <button class="hover:text-blue-500">
                  <font-awesome-icon icon="heart" />
                  <span class="text-xs hover:text-white font-semibold ml-1"
                    >Add to bookmarks</span
                  >
                </button>
                <button class="hover:text-blue-500 ml-4">
                  <font-awesome-icon icon="eye-slash" />
                  <span class="text-xs hover:text-white font-semibold ml-1"
                    >Not Seen</span
                  >
                </button>
              </div>
              <div class="flex justify-start items-center">
                <button
                  class="bg-blue-900 py-2 mr-4 font-semibold text-xs hover:bg-blue-600 px-6 rounded-sm"
                >
                  Watch Now
                </button>
                <button
                  class="bg-blue-900 py-2 mr-4 font-semibold text-xs hover:bg-blue-600 px-6 rounded-sm"
                >
                  Watch Trailer
                </button>
                <button
                  class="bg-blue-900 py-2 mr-4 font-semibold text-xs hover:bg-blue-600 px-6 rounded-sm"
                >
                  Download
                </button>
                <div>
                  <button
                    class=" py-1 px-1 mr-4 font-semibold text-xs rounded-md hover:bg-blue-900 "
                  >
                    720p
                  </button>
                  <button
                    class=" py-1 px-1 mr-4 font-semibold text-xs rounded-md bg-blue-900 hover:bg-blue-900 "
                  >
                    1080p
                  </button>
                  <button
                    class=" py-1 px-1 mr-4 font-semibold text-xs rounded-md hover:bg-blue-900 "
                  >
                    2160p
                  </button>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div id="close" class="w-1/12 text-right">
          <router-link :to="{ name: 'Home' }"
            ><font-awesome-icon icon="times" class="text-2xl text-gray-300"
          /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api.js";
import PxStarRank from "@/components/PxStarRank";
export default {
  name: "Movie",
  components: { PxStarRank },
  data() {
    return {
      loading: false,
      movie: {},
    };
  },
  created() {
    this.loading = true;
    let id = this.$route.params.id;
    api
      .getMovie(id)
      .then((movie) => (this.movie = movie))
      .finally(() => {
        this.$nextTick(() => {
          this.loading = false;
        });
      });
  },
};
</script>
<style>
.img-container {
  position: relative;
  width: 100%;
  height: 90vh;
}
.img-backdrop {
  width: 100%;
  max-height: 90vh;
  filter: blur(4px);
  -webkit-filter: blur(4px);
}
.description {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
