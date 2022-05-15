<template>
  <div class="table-row">
    <div
      class="table-cell py-3 rounded border-b-[1px] border-gray-200 border-dashed"
    >
      <h1 class="text-left font-semibold">{{ medium.title }}</h1>
    </div>
    <div
      class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
    >
      <h1 class="font-semibold">{{ medium.type }}</h1>
    </div>
    <div
      class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
    >
      <h1 class="font-semibold">{{ medium.kind }}</h1>
    </div>
    <div
      class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
    >
      <h1 class="font-semibold">{{ medium.number_of_discs }}</h1>
    </div>
    <div
      class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
    >
      <h1 class="font-semibold">{{ medium.release_year }}</h1>
    </div>

    <div
      class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
    ></div>
    <div
      class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
    >
      <div class="flex justify-end">
        <button
          @click="doPop"
          class="w-[30%] ml-7 px-2 bg-gray-100 hover:text-sky-500 rounded py-1 text-gray-400"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          class="w-[30%] ml-1 py-1 hover:text-sky-500 bg-gray-100 rounded text-gray-400"
          @click="deleteMedium"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
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
