<template>
  <div class="table-row bg-slate-400">
    <div class="table-cell py-2 rounded">
      <h1>{{ medium.title }}</h1>
    </div>
    <div class="table-cell rounded">
      <h1>{{ medium.type }}</h1>
    </div>
    <div class="table-cell rounded">
      <h1>{{ medium.kind }}</h1>
    </div>
    <div class="table-cell rounded">
      <h1>{{ medium.number_of_discs }}</h1>
    </div>
    <div class="table-cell rounded">
      <h1>{{ medium.release_year }}</h1>
    </div>

    <div class="table-cell rounded hover:bg-slate-500">
      <button @click="doPop" class="w-full px-4">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
    </div>
    <div class="table-cell rounded hover:bg-slate-500">
      <button class="w-full px-4" @click="deleteMedium">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>

    <transition name="pop">
      <media-edit v-if="isPopped" :medium="medium" @close-popup="undoPop" />
    </transition>
  </div>
</template>

<script>
import MediaEdit from '@/components/MediaEdit.vue'
import { mapActions } from 'vuex'
import { reactive, toRefs } from 'vue'
export default {
  components: {
    MediaEdit,
  },
  props: ['medium'],

  methods: {
    ...mapActions(['removeMedia']),
    deleteMedium() {
      this.removeMedia(this.medium)
    },
  },

  setup() {
    const state = reactive({
      isPopped: false,
    })
    const doPop = () => {
      state.isPopped = true
    }
    const undoPop = () => {
      state.isPopped = false
    }

    return {
      ...toRefs(state),
      doPop,
      undoPop,
    }
  },
}
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.5s;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-25%);
}
</style>
