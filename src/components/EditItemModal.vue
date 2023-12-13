<script>
import AppModal from "@/components/AppModal.vue";
import {db, storage} from "@/firebase";
import Game from "@/models/UserGame";
import UserGame from "@/models/UserGame";
export default {
  name: "EditItemModal",
  components:{
    AppModal
  },
  data() {
    return {
      editGame:  {
        name: this.item.name,
        genres: this.item.genres,
        rating: this.item.rating,


      },

      itemPriority: this.item.priority,
      genreOptions: [
        'Action','Action-Adventure','Adventure','Puzzle','Role-Playing','Sandbox','Simulation','Strategy','Sports','MMO'
      ],
      completedOptions: ['Yes', 'No']
    }
  },
  props: {
    item: {
      type:  [Object, UserGame],
      required: true
    },

  },
  methods: {
    edit(){

        db.collection('games')
          .doc(this.item.id)
          .update({name: this.editGame.name, genres: this.editGame.genres, rating: this.editGame.rating})
            .then(docRef => {
              this.addImage();
            })
    },
    addImage() {
      // this.item.id and background_image file are required
      if (!this.item.id || !this.editGame.background_image) {
        return false;
      }

      // create a filename we know will be unique
      // the other option would be to create a folder for each recipe
      let theGame = this.editGame;
      let allowedTypes = ['jpg', 'png', 'gif', 'webp'];

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
      if (theGame.background_image.size > (1000 * 1024)) {
        // file too large

        // let the user know...
        // TODO: let the user know WITHOUT alerts
        alert('File too large. 200KB max');

        return false;
      }

      // add background_image to firebase
      storage.child('games').child(this.item.id)
          //storage.child('recipes/' + this.item.id)
          .put(theGame.background_image, {
            contentType: 'image',
          })
          .then(imgRef => {
            console.log('background_image added', imgRef)

            //clear the form

            this.editGame.background_image = null;

            //get the "browser URL" for the background_image
            return imgRef.ref.getDownloadURL();
          })
          .then(url => {
            //update record
            db.collection('games').doc(this.item.id).update({background_image: url});
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
  <app-modal :title="item.name" :id="item.name"  >
    <template #header>
      <h4 class="modal-title fs-5 text-white" >Edit {{item.name}}?</h4>
    </template>
    <div class="row">
      <div class="col-sm-6 col-12 q-pa-xs">
        <q-input standout dark
                 v-model="editGame.name"
                 label="Title"
                 lazy-rules></q-input>
      </div>
      <div class="col-sm-6 col-12 q-pa-xs">
        <q-select   standout dark
                    v-model="editGame.genres"
                    label="Genre"
                    :options="genreOptions"
                    id="inputGenre">
        </q-select>
      </div>
      <div class="col-sm-6 col-12 q-pa-xs">
        <p>Rating</p>
        <div class="rate">
          <input type="radio" v-model.lazy="editGame.rating" :id="editGame.title + 'editStar4'" :name="editGame.title + 'rateEdit'" value="4" />
          <label :for="editGame.title+'editStar4'" title="text">4 stars</label>
          <input type="radio" v-model.lazy="editGame.rating" :id="editGame.title + 'editStar3'" :name="editGame.title + 'rateEdit'" value="3" />
          <label :for="editGame.title+'editStar3'" title="text">3 stars</label>
          <input type="radio" v-model.lazy="editGame.rating" :id="editGame.title + 'editStar2'" :name="editGame.title + 'rateEdit'" value="2" />
          <label :for="editGame.title+'editStar2'" title="text">2 stars</label>
          <input type="radio" v-model.lazy="editGame.rating" :id="editGame.title + 'editStar1'" :name="editGame.title + 'rateEdit'" value="1" />
          <label :for="editGame.title+'editStar1'" title="text">1 star</label>
        </div>
      </div>
      <div  class="col-sm-6 col-12 q-pa-xs">
        <p>Image</p>
        <q-file standout dark v-model="editGame.background_image" type="file" label="Add Background Image">
          <template v-slot:append>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
    </div>
    <template #footer>
      <q-btn type="button" class="btn btn-secondary" v-close-popup>Close</q-btn>
      <q-btn type="submit" class="border btn border-3 btn-dark text-white" v-close-popup @click.prevent="edit(); ">Update</q-btn>
    </template>
  </app-modal>
</template>

<style scoped>

</style>