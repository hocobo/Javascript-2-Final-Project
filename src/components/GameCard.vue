<script>
import EditItemModal from "@/components/EditItemModal.vue";
import RemoveItemModal from "@/components/RemoveItemModal.vue";
import Game from "@/models/Game";
import {db,storage, auth} from "@/firebase";
import FirebaseGame from "@/models/FirebaseGame";
import User from "@/models/User";

export default {
  name: "GameCard",
  components: {RemoveItemModal, EditItemModal},
  data: function() {
    return{
      gameAdded : false,
      thisGame : {
        name: this.item.name,
        genres: this.item.getGenres,
        rating: this.item.rating,
        released: this.item.released,
        background_image: this.item.background_image,
        gameType:'Game',
        favorite: this.item.favorite,

      }
    }
  },
  props:{
    item: {
      type:[Game, Object, FirebaseGame],
      required:true,
    },
    getStars:{
      type: Function,
    },
    authUser: {required:true},
  },
  methods: {
    addGameDb() {



      if(this.authUser){
        this.thisGame.user = this.authUser.email;
        db.collection('games').add(this.thisGame)
            .then(docRef => {
              // this.addImage(docRef.id);

              this.gameAdded = true;
              alert('Game Added')
            })
            .catch(error => {
              console.error('game not added', error);
            })
      } else{
        alert('Must be signed in to add a Game')
      }

    },
    // addImage(docId) {
    //   if(!docId || !this.item.background_image) {
    //     return false;
    //   }
    //   let theGame = this.item;
    //   let allowedTypes = ['jpg', 'png', 'gif', 'webp'];
    //   let extension = theGame.background_image.name.toLowerCase().split('.').pop();
    //
    //   if(allowedTypes.indexOf(extension) < 0) {
    //     alert("Invalid file type.")
    //   }
    //   if(theGame.background_image.size > (200 * 1024)) {
    //     alert('File too large. 200kb max');
    //
    //     return false;
    //   }
    //   storage.child('games').child(docId)
    //       .put(theGame.background_image)
    //       .then(imgRef => {
    //         console.log('image added', imgRef)
    //       })
    //       .then(url => {
    //         db.collection('games').doc(docId).update({background_image: url});
    //       })
    //       .catch(error => {
    //         console.error('Something went wrong storing image', error);
    //       })
    // },


  }
}
</script>

<template>
  <div>
    <q-img class="card-img-top" :src="item.background_image"></q-img>
    <q-card-section class="column items-baseline">

      <div class="text-h6 ">{{item.name}}</div>
      <div>Genre: {{item.getGenres || item.genres}} <br>
        Rating: <span v-html="getStars(Math.floor(item.rating), item.type)"></span></div>


    </q-card-section>
  </div>



    <q-card-actions align="around" >
      <div v-if="item.fromFirebase">
        <q-btn v-if="item.isFavorite()" @click ="item.unfavoriteGame(item)"   icon="fa-solid fa-2xl fa-heart" style="color: #f40101;"></q-btn>
        <q-btn v-else @click ="item.favoriteGame(item)" icon="fa-solid fa-2xl fa-heart" style="color: #fafafa;"></q-btn>
      </div>

      <q-btn v-if="item.fromFirebase"  @click="item.removeModal = true" icon="fa-solid fa-trash fa-2xl" class="removeHover"></q-btn>
      <q-btn v-else-if="gameAdded===false"  @click="addGameDb" icon="fa-solid fa-plus"></q-btn>

    </q-card-actions>
    <remove-item-modal v-model="item.removeModal" :item="item" ></remove-item-modal>




</template>

<style scoped>

</style>