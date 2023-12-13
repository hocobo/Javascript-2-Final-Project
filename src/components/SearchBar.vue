<script>
export default {
  name: "SearchBar",
  data: function() {
    return {
      newSearch: ''
    }
  },
  methods: {
    submitSearch(){

      this.$emit('search-emit', this.newSearch);
      this.newSearch = '';
    }
  },

}
</script>

<template>
  <q-form @submit.prevent="submitSearch">

    <q-input dark rounded standout v-model="newSearch"   >
      <template v-slot:append>
        <q-btn flat round  type="submit" @click="submitSearch" icon="search"/>
      </template>
    </q-input>
  </q-form>
</template>

<style scoped>

</style>