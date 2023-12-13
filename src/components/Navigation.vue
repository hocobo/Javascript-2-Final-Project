<script>
import {auth,firebase} from '@/firebase/index'
export default {
  name: "Navigation",
  props: {
    authUser: {required:true},
  },
  methods: {
    login() {
      let provider = new firebase.auth.GoogleAuthProvider();

      auth.signInWithPopup(provider)
          .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.error(error);
          })
    },
    logout() {
      auth.signOut();
    }

  }
}
</script>

<template>
  <div class="q-mt-xl row flex-center">
    <q-btn  to="/" class="text-h6 col-11 glossy ">My Games</q-btn>
    <q-btn  to="/searchLibrary" class="text-h6 col-11 glossy">Search Library</q-btn>
    <q-btn v-if="authUser" @click.prevent="logout" class="text-h6 col-11 glossy">Logout</q-btn>
    <q-btn v-else @click.prevent="login" class="text-h6 col-11 glossy">Login</q-btn>

  </div>

</template>

<style scoped>

</style>