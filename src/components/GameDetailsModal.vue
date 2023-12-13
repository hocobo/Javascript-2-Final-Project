<script>
import AppModal from "@/components/AppModal.vue";
export default {
  name: "GameDetailsModal",
  components: {
    AppModal
  },
  props:{
    item: {
      type: Object,
      required: true
    },
    deleteFunction: {
      type: Function
    },
    editFunction: {
      type: Function
    },
    getStars: {
      type: Function
    },
    length:{
      type: Number,
      required: true
    }
  },
}
</script>

<template>
  <app-modal :id="'gameDetails' + item.priority" title="Game Details">
    <div class="row">
      <div class="col-md-6">
        <b>Title</b>
        <p id="gameTitle">{{item.title}}</p>
      </div>
      <div class="col-md-6">
        <b>Genre</b>
        <p id="gameGenre">{{item.genre}}</p>
      </div>
      <div class="col-md-4">
        <b>Completed</b>
        <p id="gameCompleted">{{item.completed}}</p>
      </div>
      <div class="col-md-4">
        <b>Rating</b><br>
        <span v-html="getStars(item.rating)"></span>
      </div>
      <div class="col-md-4">
        <b>Priority</b>
        <p id="gamePriority">{{item.priority}}</p>
      </div>
    </div>
    <template #footer >
      <div class="d-flex justify-content-evenly d-md-none d-lg-none d-xl-none">
        <button type="button"  class="border btn border-3 btn-dark text-white me-1 btn-hover "   data-bs-toggle="modal" :data-bs-target="'#edit' + item.priority.toString()">
          Edit
        </button>
        <button type="button" class="border btn border-3 border-danger btn-dark text-white removeButton" data-bs-toggle="modal" :data-bs-target="'#delete'+item.priority.toString()">
          Remove
        </button>

      </div>
    </template>

  </app-modal>
</template>

<style scoped>

</style>