<script>
import AppModal from "@/components/AppModal.vue";
import UserGame from "@/models/UserGame";
import {db,storage} from "@/firebase";
export default {
  name: "AddItemModal",
  components: {
    AppModal
  },
  data() {
    return {
      newGame: {
        game: new UserGame(),
        background_image: null,
      },
      genreOptions: [
        'Action','Action-Adventure','Adventure','Puzzle','Role-Playing','Sandbox','Simulation','Strategy','Sports','MMO'
      ],
      completedOptions: ['Yes', 'No']
    }
  },
  props:{
    id: {
      type: String,
      required: true,
    },
    authUser:{required:true},
  },
  methods:{
    addGame(){
      db.collection('games').add(this.newGame.game)
          .then(docRef => {
            this.addUser(docRef.id);
            this.addImage(docRef.id);
            this.newGame.game = new UserGame();
          })
          .catch(error => {
            console.error('game Not added',error);
          })

    },
    addUser(docId){
      db.collection('games')
          .doc(docId)
          .update({user:this.authUser.email})
    },
    addImage(docId) {
      // docId and background_image file are required
      if (!docId || !this.newGame.background_image) {
        return false;
      }

      // create a filename we know will be unique
      // the other option would be to create a folder for each recipe
      let theGame = this.newGame;
      let allowedTypes = ['jpg', 'jpeg','png', 'gif', 'webp'];

      let extension = theGame.background_image.name.toLowerCase().split('.').pop()

      console.log(extension);

      // validate extension
      if (allowedTypes.indexOf(extension) < 0) {
        // invalid extension

        // let the user know...
        // TODO: let the user know WITHOUT alerts
        alert('Invalid file type.');

        return false;
      }

      // validate size (less than 200KB
      if (theGame.background_image.size > (5000 * 1024)) {
        // file too large

        // let the user know...
        // TODO: let the user know WITHOUT alerts
        alert('File too large. 200KB max');

        return false;
      }

      // add background_image to firebase
      storage.child('games').child(docId)
          //storage.child('recipes/' + docId)
          .put(theGame.background_image, {
            contentType: 'image',
          })
          .then(imgRef => {
            console.log('background_image added', imgRef)

            //clear the form

            this.newGame.background_image = null;

            //get the "browser URL" for the background_image
            return imgRef.ref.getDownloadURL();
          })
          .then(url => {
            //update record
            db.collection('games').doc(docId).update({background_image: url});
          })
          .then(docRef => {
            console.log('Game updated with background_image');


          })
          .catch(error => {
            console.error('Something went wrong', error);
          })

    }

  },
}
</script>

<template>
  <app-modal :id="id" title="Add Game">
    <div class="row  ">
      <div class="col-sm-6 col-12 q-pa-xs">
        <q-input dark standout
                 v-model="newGame.game.name"
                 label="Title"
                 :rules="[
                    val => (val && val.length > 0) || 'Title Required'
                 ]"

                 required="true"
        ></q-input>
      </div>
      <div class="col-sm-6 col-12 q-pa-xs">
        <q-select   dark standout
                    v-model="newGame.game.genres"
                    label="Genre"
                    :options="genreOptions"
                    id="inputGenre">
        </q-select>
      </div>
      <div class="col-sm-6 col-12 q-pa-xs">
        <p>Rating</p>
        <div class="rate">

          <input type="radio" v-model="newGame.game.rating" id="star4" name="rate" value="4" />
          <label for="star4" title="text">4 stars</label>
          <input type="radio" v-model="newGame.game.rating" id="star3" name="rate" value="3" />
          <label for="star3" title="text">3 stars</label>
          <input type="radio" v-model="newGame.game.rating" id="star2" name="rate" value="2" />
          <label for="star2" title="text">2 stars</label>
          <input type="radio" v-model="newGame.game.rating" id="star1" name="rate" value="1" />
          <label for="star1" title="text">1 star</label>
        </div>
      </div>
      <div  class="col-sm-6 col-12 q-pa-xs">
        <p>Image</p>
        <q-file standout dark v-model="newGame.background_image" type="file" label="Add Background Image">
          <template v-slot:append>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
    </div>
    <template #footer>

      <q-btn type="button" class="btn btn-secondary " v-close-popup>Close</q-btn>
      <q-btn type="submit" class="border btn border-3 btn-dark text-white" v-close-popup @click.prevent="addGame">Add Game</q-btn>


    </template>



  </app-modal>
</template>

<style scoped>

</style>