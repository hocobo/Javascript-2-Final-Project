
<script>

//https://codepen.io/tkowalch/pen/Vwgqaeq
//TODO: Add date method for release date
// Implement search bar
// Implement authorization
//TODO: Implement sort functionality




//storing image
//assigning to user


//rawg.io api Key
//f17bd7a4f90b400d94a1306456c758a1
import GameCollection from "@/models/GameCollection";
import Game from "@/models/Game";
import AddItemModal from "@/components/AddItemModal.vue";
import GameList from "@/components/GameList.vue";
import SearchBar from "@/components/SearchBar.vue";
import {RouterLink, RouterView} from "vue-router";
import Navigation from "@/components/Navigation.vue";
import {firebase, auth} from '@/firebase/index'
import User from "@/models/User";

export default {
  components:{
    AddItemModal,
    GameList,
    SearchBar,
    Navigation
  },
  data: function(){
    return {
      logoBeat: false,
      leftDrawerOpen: false,
      authUser: null,
    }
  },
  created() {
    // check for logged in user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // console.log('Signed in as:',user);

        this.authUser = new User(user);


      } else {
        // User is signed out.
        console.log('Not signed in.');

        this.authUser = null;
      }
    });
  },

  methods: {

    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
      console.log(this.leftDrawerOpen);

    },

  },
  computed: {

  },
}
</script>

<template>
  <div id="app">
    <q-layout view="hhh LpR fFf" dark>

      <q-header elevated class="bg-dark text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"></q-btn>

          <q-toolbar-title class="row wrap">
            <div class="col-sm-6  ">
              <q-avatar>
                <i @click="logoBeat = !logoBeat" :class="{'fa-solid':true, 'fa-gamepad':true, 'fa-beat': logoBeat, 'fa-xl':true, 'me-3':true}" style="color: #85E024;"></i>
              </q-avatar>
              Video Game Collection
            </div>
            <div class="col-6  column justify-sm-center justify-end items-end gt-xs">
              <q-img rounded v-if="authUser" :src="authUser.photoURL" class=" avatar justify-end"></q-img>
            </div>
          </q-toolbar-title>

        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" >
        <!-- drawer content -->
        <navigation :auth-user = authUser></navigation>

      </q-drawer>

      <q-page-container>

        <router-view :authUser = "authUser"/>

      </q-page-container>

      <q-footer elevated class="bg-grey-8 text-white"  >
        <q-toolbar class="row justify-end">
          <q-toolbar-title>
            <q-avatar>
              <i @click="logoBeat = !logoBeat" :class="{'fa-solid':true, 'fa-gamepad':true, 'fa-beat': logoBeat, 'fa-xl':true, 'me-3':true}" style="color: #85E024;"></i>
            </q-avatar>
            Video Game Collection
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

    </q-layout>

  </div>
</template>

<style lang="scss">


//@import url('https://fonts.googleapis.com/css2?family=Balthazar&display=swap');
.q-card-section{

}
.avatar {
  border-radius: 50%;
  height: 30px;
  max-width: 30px;

}
.card-img-top {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.my-card {
  width: 100%;
  max-width: 285px;
  margin-bottom:10px;

  //display:flex;
  //flex-direction: column;
  //justify-content: space-between;
}
.my-footer {
  max-height: 2vh;
}

#app{
  font-family:"copperplate",fantasy;
}
.tableTitle{
  cursor:default;
}
td{
  cursor:pointer;
}
th a{
  display:block;
  cursor:pointer;
}
.removeHover:hover {
  color: #DC3545FF;;

}
th:hover {
  background-color: #23434a;
}
.noHover:hover{
  background-color: #0A2E36;
}
.contentWidth{
  max-width:1500px;
  margin: 0 auto;
  overflow:hidden;
}
//.removeButton:hover{
//  background-color:$danger;
//}
nav{
  height:15%;
  min-height:15vh;
  /*min-height:100px;*/
}
main{
  height:75%;
  min-height:75vh;
}
*{
  margin: 0;
  padding: 0;
}
.rate {
  float: left;
  height: 46px;
  padding: 0 10px;
}
.rate:not(:checked) > input {
  position:absolute;
  top:-9999px;
}
.rate:not(:checked) > label {
  float:right;
  width:1em;
  overflow:hidden;
  white-space:nowrap;
  cursor:pointer;
  font-size:30px;
  color:#ccc;
}
.rate:not(:checked) > label:before {
  content: '★ ';
}
.rate > input:checked ~ label {
  color: #ffc700;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}
</style>
