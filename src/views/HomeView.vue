<template>
  <main
    class="min-h-screen bg-purple-500 lg:bg-gradient-to-r from-red-400 to-pink-400 transition-all"
  >
    <div
      class="relative w-[60%] rounded px-4 py-4 bg-slate-600 align-middle mx-auto"
    >
      <div class="mt-5"></div>
      <div
        class="table text-center w-[80%] mx-auto"
        style="border-spacing: 2px"
      >
        <div class="table-row">
          <div class="table-cell">
            <button
              class="p-2 text-xl font-bold leading-none text-gray-900 outline-none"
              @click="sorting = !sorting"
            >
              Názov
            </button>
          </div>
          <div class="table-cell">
            <h3
              class="p-2 text-xl font-bold leading-none text-gray-900 outline-none"
            >
              Typ
            </h3>
          </div>
          <div class="table-cell">
            <h3
              class="p-2 text-xl font-bold leading-none text-gray-900 outline-none"
            >
              Druh
            </h3>
          </div>
          <div class="table-cell">
            <h3
              class="p-2 text-xl font-bold leading-none text-gray-900 outline-none"
            >
              počet diskov
            </h3>
          </div>
          <div class="table-cell">
            <h3
              class="p-2 text-xl font-bold leading-none text-gray-900 outline-none"
            >
              Rok vydania
            </h3>
          </div>
        </div>
        <div class="table-row">
          <div class="table-cell">
            <input
              class="h-[40px] w-[100%] bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              placeholder="zadajte názov..."
              v-model="searchWord"
            />
          </div>
          <div class="table-cell">
            <select
              class="h-[40px] w-full bg-gray-200 border-2 border-gray-200 text-gray-700 rounded leading-tight"
              name=""
              id=""
              v-model="type"
            >
              <option selected value="">Všetky</option>
              <option value="CD">CD</option>
              <option value="DVD">DVD</option>
              <option value="BluRay">BluRay</option>
            </select>
          </div>
          <div class="table-cell">
            <select
              class="h-[40px] w-full bg-gray-200 border-2 border-gray-200 text-gray-700 rounded leading-tight"
              name=""
              id=""
              v-model="kind"
            >
              <option selected value="">Všetky</option>
              <option value="Movie">Movie</option>
              <option value="Music">Music</option>
              <option value="Software">Software</option>
              <option value="Game">Game</option>
            </select>
          </div>
          <div class="table-cell">
            <button
              class="h-[40px] w-[100%] bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              Usporiadať
            </button>
          </div>
          <div class="table-cell">
            <button
              class="h-[40px] w-[100%] bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            >
              Usporiadať
            </button>
          </div>
        </div>
        <transition-group name="media">
          <Media
            v-for="medium in filteredMedia"
            :medium="medium"
            :key="medium.guid"
          />
        </transition-group>
      </div>
      <div class="flex justify-center mt-6 gap-5">
        <button
          class="bg-gray-200 rounded px-4 py-2 hover:bg-green-300 hover:text-white"
          @click="showForm"
        >
          Pridať médium...
        </button>
        <button
          class="bg-gray-200 px-4 py-2 rounded hover:bg-green-300 hover:text-white"
          @click="hideForm"
        >
          X
        </button>
      </div>
      <transition name="addform">
        <media-create-form v-if="isShowed" />
      </transition>
    </div>
  </main>
</template>

<script>
import Media from '@/components/Media.vue'
import MediaCreateForm from '@/components/MediaCreateForm.vue'
import { mapGetters, mapActions } from 'vuex'
import { reactive, toRefs } from 'vue'
export default {
  components: {
    Media,
    MediaCreateForm,
  },
  data() {
    return { media: [] }
  },
  //props: ['media'],

  methods: {
    ...mapActions(['getMedia']),
  },
  computed: {
    ...mapGetters(['allMedia']),
    filteredMedia() {
      try {
        let a =
          this.$store.getters.getFilteredMedia ||
          this.$store.getters.allMedia ||
          this.$store.getters.filteredByType ||
          this.$store.getters.filteredByKind ||
          this.$store.getters.filteredByYear ||
          this.$store.getters.filteredByDiscs

        return a
      } catch (e) {
        console.log(e)
      }
      return this.filteredMedia
    },
    searchWord: {
      get() {
        return this.$store.state.searchWord
      },
      set(value) {
        this.$store.dispatch('FILTERED_MEDIA', value)
      },
    },
    type: {
      get() {
        return this.$store.state.type
      },
      set(value) {
        this.$store.dispatch('filteredByType', value)
      },
    },
    kind: {
      get() {
        return this.$store.state.kind
      },
      set(value) {
        this.$store.dispatch('filteredByKind', value)
      },
    },
  },
  created() {
    this.getMedia()
  },

  setup() {
    const state = reactive({
      isShowed: false,
    })
    const showForm = () => {
      state.isShowed = true
    }
    const hideForm = () => {
      state.isShowed = false
    }

    return {
      ...toRefs(state),
      showForm,
      hideForm,
    }
  },
}
</script>
<style scoped>
.media-enter-active,
.media-leave-active {
  transition: all 0.3s;
}
.media-enter-from,
.media-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.addform-enter-active,
.addform-leave-active {
  transition: all 0.2s;
}
.addform-enter-from,
.addform-leave-to {
  opacity: 0;
  transform: translateY(-25%);
}
</style>
