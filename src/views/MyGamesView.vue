<script>
import GameList from "@/components/GameList.vue";
import GameCollection from "@/models/GameCollection";
import AddItemModal from "@/components/AddItemModal.vue";
import UserGame from "@/models/UserGame";
import {db,storage,auth} from "@/firebase"
import Game from "@/models/Game";
import FirebaseGame from "@/models/FirebaseGame";
import SearchBar from "@/components/SearchBar.vue";
import SortButtonGroup from "@/components/SortButtonGroup.vue";

export default {
  name: "MyGamesView",
  components: {SortButtonGroup, SearchBar, AddItemModal, GameList},
  data: function() {
    return {

      gameList:  new GameCollection(),
      searchTerm: '',
      addGameModalBool: false,

    }
  },
  props: {
     authUser:{required:true},
  },
  methods: {
    loadGames(){
      db.collection('games').onSnapshot(snapshot => {
        this.gameList = new GameCollection();

        snapshot.forEach(doc => {

          if(doc.data().user === this.authUser.email){
            if(doc.data().gameType === 'Game'){
              this.gameList.addItem(new FirebaseGame(doc.id, doc.data()));
            }
            else{
              this.gameList.addItem(new UserGame(doc.id, doc.data()));
            }
          }
        })
        this.gameList.sortCollectionLowercase('name');
      })

    },

    setSearchTerm(searchTerm){
      this.searchTerm = searchTerm;
    },
  },
  computed: {
    computedGameList() {
      return this.gameList.filterOnSearch(this.searchTerm);
    }
  },
  mounted: function() {
    this.loadGames();

  }
}
</script>

<template>
  <q-page class="my games">


    <div v-if="authUser">
      <div class="q-pa-md row wrap ">
        <div class="col-xs-12 col-sm-6  column items-sm-start items-center ">
          <h3 class="">My Games  <q-btn  class="gt-xs" rounded icon="fa-solid fa-plus" @click="addGameModalBool = true"></q-btn></h3>
        </div>
        <div class="col-sm-6 col-12 q-mt-sm q-mt-sm-none column justify-sm-start items-sm-end ">
          <search-bar @search-emit ="setSearchTerm"></search-bar>
        </div>
        <div class="col-sm-6 col-12 q-mt-md q-mt-sm-none column justify-sm-center items-stretch items-sm-start">
          <sort-button-group
                             @sort-name="gameList.sortCollectionLowercase('name')"
                             @sort-genre="gameList.sortCollectionLowercase('genres')"
                             @sort-rating="gameList.sortCollection('rating')"
                             @sort-favorite="gameList.sortCollection('favorite')">
          </sort-button-group>
          <q-btn  class="lt-sm q-mt-sm" label="Add Game" @click="addGameModalBool = true"></q-btn>
        </div>

      </div>
      <game-list v-bind:list="computedGameList"
                 :key = "gameList"
                 :authUser="authUser"
      ></game-list>
    </div>
    <div v-else>
      <h3 class="q-pa-md">My Games</h3>
      <h5  class="column  items-center justify-center " style="min-height:40vh;">Log In to Manage Your Games</h5>
    </div>


    <add-item-modal v-model="addGameModalBool" id="addItemModal" :authUser="authUser" ></add-item-modal>
  </q-page>
</template>

<style scoped>

</style>