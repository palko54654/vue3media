<template>
  <main class="min-h-screen bg-gray-200 transition-all font-poppins">
    <div
      v-if="overlay"
      id="overlay"
      class="bg-black bg-opacity-40 fixed top-0 left-0 w-full h-screen z-10"
      key="-1"
    ></div>

    <div class="bg-white h-[80px]">
      <div class="flex justify-between w-[65%] mx-auto align-middle pt-5">
        <h1 class="text-xl font-semibold leading-[40px]">Tabuľka s médiami</h1>
        <div class="flex relative">
          <button
            @click="toggleFilter"
            class="rounded bg-gray-100 px-4 py-2 hover:bg-sky-500 hover:text-white transition-all"
          >
            <i class="fa-solid fa-filter"></i>
            Filter
          </button>
          <div
            class="absolute bg-white top-[40px] left-[-230px] w-[320px] px-6 py-6 z-20 rounded shadow-xl"
            v-if="showFilter"
          >
            <div class="border-b-[1px] pb-2 border-solid border-gray-200">
              <h1 class="font-semibold">Možnosti filtrovania</h1>
            </div>
            <div class="mt-3">
              <h1>Filtrovať podľa názvu:</h1>
              <input
                class="h-[40px] w-[90%] bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                type="text"
                placeholder="zadajte názov..."
                v-model="searchWord"
              />
            </div>
            <div class="mt-4">
              <h1>Filtrovať podľa typu:</h1>
              <select
                class="h-[40px] w-[90%] bg-gray-200 border-2 border-gray-200 text-gray-700 rounded leading-tight"
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
            <div class="mt-4">
              <h1>Filtrovať podľa druhu:</h1>
              <select
                class="h-[40px] w-[90%] bg-gray-200 border-2 border-gray-200 text-gray-700 rounded leading-tight"
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
          </div>
          <button
            class="ml-3 flex bg-gray-100 rounded px-4 py-2 hover:bg-sky-500 hover:text-white transition-all"
            @click="showForm"
          >
            <svg
              class="mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                opacity="0.5"
                x="11.364"
                y="20.364"
                width="16"
                height="2"
                rx="1"
                transform="rotate(-90 11.364 20.364)"
                fill="currentColor"
              ></rect>
              <rect
                x="4.36396"
                y="11.364"
                width="16"
                height="2"
                rx="1"
                fill="currentColor"
              ></rect>
            </svg>
            <p class="pl-2">Vytvoriť médium</p>
          </button>
        </div>
      </div>
    </div>
    <div class="flex align-middle justify-center">
      <div
        class="relative w-[60%] rounded px-4 py-20 bg-white align-middle mx-auto mt-20"
      >
        <div class="mt-5"></div>
        <div
          class="table text-center w-[80%] mx-auto"
          style="border-spacing: 0px"
        >
          <div class="table-row">
            <div
              class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
            >
              <h1
                class="py-2 text-l font-bold leading-none text-gray-300 outline-none text-left"
              >
                Názov
              </h1>
            </div>
            <div
              class="table-cell rounded border-b-[1px] border-gray-200 border-dashed pb-3"
            >
              <h3
                class="p-2 text-l font-bold leading-none text-gray-300 outline-none"
              >
                Typ
              </h3>
            </div>
            <div
              class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
            >
              <h3
                class="p-2 text-l font-bold leading-none text-gray-300 outline-none"
              >
                Druh
              </h3>
            </div>
            <div
              class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
            >
              <h3
                class="p-2 text-l font-bold leading-none text-gray-300 outline-none"
              >
                počet diskov
              </h3>
            </div>
            <div
              class="table-cell rounded border-b-[1px] border-gray-200 border-dashed"
            >
              <h3
                class="p-2 text-l font-bold leading-none text-gray-300 outline-none"
              >
                Rok vydania
              </h3>
            </div>
            <div
              class="table-cell border-b-[1px] border-gray-200 border-dashed"
            ></div>
            <div
              class="table-cell border-b-[1px] border-gray-200 border-dashed"
            >
              <h3
                class="text-right text-l font-bold leading-none text-gray-300 outline-none"
              >
                Akcie
              </h3>
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

        <transition name="addform">
          <media-create-form v-if="isShowed" @close-form="hideForm" />
        </transition>
      </div>
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
      overlay: false,
      showFilter: false,
      hideFilter: false,
    })
    const showForm = () => {
      state.isShowed = true
      state.overlay = true
    }
    const hideForm = () => {
      state.isShowed = false
      state.overlay = false
    }
    const toggleFilter = () => {
      if (state.showFilter == state.hideFilter) {
        state.showFilter = true
      } else {
        state.showFilter = false
      }
    }
    return {
      ...toRefs(state),
      showForm,
      hideForm,
      toggleFilter,
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
  transition: all 0.5s;
}
.addform-enter-from,
.addform-leave-to {
  opacity: 0;
  transform: translateY(-25%);
}
</style>
