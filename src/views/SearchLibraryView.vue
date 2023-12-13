<script>
import SearchBar from "@/components/SearchBar.vue";
import axios from "axios"
import GameList from "@/components/GameList.vue";
import GameCollectionFactory from "@/models/GameCollectionFactory";
import SortButtonGroup from "@/components/SortButtonGroup.vue";

export default {
  name: "SearchLibraryView",
  components: {SortButtonGroup, SearchBar, GameList},
  data: function() {
    return {
      databaseGames: null,
    }
  },
  props: {
     authUser: {required:true},
  },
  methods: {
    searchDatabase(searchTerm){
      this.databaseGames = [];
      let endpoint = 'https://api.rawg.io/api/games';
      let params = {
        search: searchTerm,
        key: 'f17bd7a4f90b400d94a1306456c758a1',
        page_size: 32,
      };
      axios.get(endpoint, {params})
          .then(response => {


            this.databaseGames = GameCollectionFactory.createFromRawgDatabase(response.data);

          })

    },
  },
}
</script>

<template>
  <q-page >
    <div class="q-pa-md row wrap">
      <div class="col-xs-12 col-sm-6  column items-sm-start items-center">
        <h3>Search Library</h3>

      </div>
      <div class="col-sm-6 col-12 q-mt-lg q-mt-sm-none column justify-sm-start items-sm-end ">
        <search-bar @search-emit ="searchDatabase"></search-bar>
      </div>

    </div>

      <h5 v-if="databaseGames === null" class="column q-pa-sm items-center justify-center " style="min-height:40vh;"> Search RAWG API's Expansive Library to Add Games to Your Collection</h5>
      <game-list v-else  v-bind:list="databaseGames" :key="databaseGames" :authUser="authUser"></game-list>


  </q-page>
</template>

<style scoped>

</style>