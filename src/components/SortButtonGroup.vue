<script>
export default {
  name: "SortButtonGroup"
}
</script>

<template>
  <q-btn-dropdown class="q-mt-sm-sm"  label="Sort">
    <q-list>
      <q-item clickable v-close-popup @click="$emit('sort-name')">
        <q-item-section>
          <q-item-label>Name</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="$emit('sort-genre')">
        <q-item-section>
          <q-item-label>Genre</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="$emit('sort-rating')">
        <q-item-section>
          <q-item-label>Rating</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click="$emit('sort-favorite')">
        <q-item-section>
          <q-item-label>Favorite</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>

</template>

<style scoped>

</style>