<script>
import

  GameCollection from "@/models/GameCollection";
import GameListItem from "@/components/GameListItem.vue";
export default {
  name: "GameList",
  components: {
    GameListItem
  },
  props:{
    list: {
      type: Array,
      required: true,
    },
    authUser:{required:true}

  },
}
</script>

<template>
  <div class="q-px-md q-pt-sm row items-stretch justify-around items-start q-gutter-sm">
    <game-list-item v-for="item in list"
                    :key="item.title"
                    :item="item"
                    :authUser="authUser"

    ></game-list-item>
  </div>
</template>

<style scoped>

</style>