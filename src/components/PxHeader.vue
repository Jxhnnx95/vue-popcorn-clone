<template>
  <header class="flex flex-col justify-center">
    <div id="up" class="flex justify-between items-center pl-2">
      <div id="resize" class="w-1/3">
        <button @click="showModal">
          <font-awesome-icon icon="expand-alt" id="expandIcon" class />
        </button>
      </div>
      <div id="title" class="font-semibold w-1/3 text-center">
        Popcorn Time Clone
      </div>
      <div id="window" class="w-1/3 flex justify-end">
        <button class="w-auto px-2 hover:bg-blue-500">
          <font-awesome-icon icon="window-minimize" class />
        </button>
        <button class="w-auto px-2 py-1 hover:bg-blue-500">
          <font-awesome-icon :icon="['far', 'window-restore']" class />
        </button>
        <button class="w-auto px-2 hover:bg-red-500">
          <font-awesome-icon icon="times" class />
        </button>
      </div>
    </div>
    <div id="down" class="flex justify-between items-center">
      <nav class="w-1/2">
        <ul class="flex justify-start">
          <li>
            <router-link
              :to="{ name: 'Home' }"
              ref="btnMovies"
              class="text-gray-500 font-semibold text-sm px-5 border-b-4 hover:text-white py-1 border-blue-500"
            >
              Movies
            </router-link>
          </li>
          <li>
            <button
              class="text-gray-500 font-semibold text-sm px-5 border-b-4 hover:text-white py-1 border-transparent"
            >
              Series
            </button>
          </li>
          <li>
            <button
              class="text-gray-500 font-semibold text-sm px-5 border-b-4 hover:text-white py-1 border-transparent"
            >
              Anime
            </button>
          </li>
          <li>
            <button
              class="text-gray-500 font-semibold text-sm px-5 border-b-4 hover:text-white py-1 border-transparent"
            >
              Favorites
            </button>
          </li>
          <li>
            <PxDropDown
              :name="`Genres`"
              :select="selectGenre"
              :data="genresData"
              @change="changeValue"
            />
          </li>
          <li>
            <PxDropDown
              :name="`Sort by`"
              :select="selectSort"
              :data="sortByData"
              @change="changeValue"
            />
          </li>
        </ul>
      </nav>
      <div id="buttons" class="w-1/2 flex justify-end">
        <button id="btn-unlock" class="px-1 py-1">
          <font-awesome-icon icon="unlock" />
        </button>
        <button class="px-1 text-gray-500 hover:text-blue-500 py-1">
          <font-awesome-icon icon="search" />
        </button>
        <button class="px-1 text-gray-500 hover:text-blue-500 py-1">
          <font-awesome-icon icon="heart" />
        </button>
        <button class="px-1 text-gray-500 hover:text-blue-500 py-1">
          <font-awesome-icon icon="inbox" />
        </button>
        <button class="px-1 text-gray-500 hover:text-blue-500 py-1">
          <font-awesome-icon icon="info-circle" />
        </button>
        <button class="px-1 text-gray-500 hover:text-blue-500 py-1">
          <font-awesome-icon icon="download" />
        </button>
        <button class="px-1 text-gray-500 hover:text-blue-500 py-1">
          <font-awesome-icon icon="cog" />
        </button>
      </div>
    </div>
    <modal name="example" class="text-gray-800" width="80%" height="auto">
      <div class="p-2 text-justify">
        <p class="font-semibold text-2xl text-center">Hola!</p>
        <p>
          Soy
          <a
            target="_blank"
            class="text-blue-500 hover:underline"
            href="https://jxhnnx95.github.io/"
            >Johnny Barrantes</a
          >, Gracias por entrar al clon de popcorn time. El objetivo del
          proyecto es emular con la mayor fidelidad posible la interfaz de la
          app y poder prácticar el desarrollo FrontEnd. Este proyecto fue
          desarrollado con los frameworks VueJs y TailwindCss
        </p>
        <p class="font-bold">Nota:</p>
        <p class="text-sm">
          Este es un proyecto con fines educativos, aquí no hay enlaces ni
          videos relacionados a las peliculas. Tampoco tiene ninguna relación
          con la aplicación Popcorn-Time, solamente traté de emular su interfaz.
          Le doy todos los créditos que correspondan a
          <a
            target="_blank"
            class="text-blue-500 hover:underline"
            href="https://themoviedb.org"
            >popcorn-time</a
          >
          y
          <a
            target="_blank"
            class="text-blue-500 hover:underline"
            href="https://popcorntime.app"
            >the movie database</a
          >
          por el uso de su api.
        </p>
        <div class="flex justify-center py-5">
          <img
            width="10%"
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt=""
          />
          <img
            width="10%"
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <button
          class="px-2 py-1 bg-blue-500 text-white shadow-md rounded-sm hover:bg-blue-700 self-center"
          v-on:click="closeModal()"
        >
          Cerrar
        </button>
      </div>
    </modal>
  </header>
</template>

<script>
import PxDropDown from "@/components/PxDropDown";
import api from "@/api";
export default {
  name: "PxHeader",
  components: { PxDropDown },
  data() {
    return {
      selectGenre: "All",
      selectSort: "popularity.desc",
      genresData: [],
      sortByData: [],
    };
  },
  created() {
    this.genresData = [{ id: "All", name: "Todos" }];
    api
      .getGenres()
      .then((genres) => (this.genresData = this.genresData.concat(genres)));
    this.sortByData = [
      { id: "popularity.desc", name: "Popularidad" },
      { id: "release_date.desc", name: "Año" },
      { id: "revenue.desc", name: "Ganancias" },
      { id: "original_title.desc", name: "Titulo" },
      { id: "vote_count.desc", name: "Votos" },
    ];
  },
  mounted() {
    this.$modal.show("example");
  },
  methods: {
    showModal() {
      this.$modal.show("example");
    },
    closeModal() {
      this.$modal.hide("example");
    },
    changeValue(value) {
      if (value.name == "Genres") {
        this.selectGenre = value.id;
      } else {
        this.selectSort = value.id;
      }
      console.log(this.selectGenre);
      console.log(this.selectSort);
      this.$router.push({
        name: "Movies",
        params: { genre: this.selectGenre, sort: this.selectSort },
      });
    },
  },
};
</script>

<style scoped>
header {
  background-color: #17181b;
  -webkit-box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 11px 0px rgba(0, 0, 0, 0.75);
}
#expandIcon {
  color: #010101;
}
.sortIcon {
  position: absolute;
  top: 37px;
}
#genres {
  background: #17181b;
}
#btn-unlock {
  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}
@keyframes spin {
  from {
    color: #f56565;
  }
  50% {
    color: #17181b;
  }
  to {
    color: #f56565;
  }
}
</style>
