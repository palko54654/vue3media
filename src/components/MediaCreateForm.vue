<template>
  <div class="absolute w-[65%] mx-auto top-6 left-[16%] z-20 bg-white rounded">
    <div class="border-b-[1px] border-solid border-gray-200 pb-2 pt-6">
      <div class="flex justify-between w-[85%] mx-auto">
        <h1 class="text-left text-2xl font-semibold">Pridať médium</h1>
        <button
          class="0 px-4 py-2 rounded hover:text-sky-500 text-gray-300"
          @click="emit('close-form')"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
    <div class="flex justify-center">
      <form
        @submit="onSubmit"
        action=""
        class="w-[75%] justify-center pb-6 text-center mt-6 grid gap-4 grid-cols-2 align-middle content-center"
      >
        <div>
          <input
            class="h-[40px] w-full bg-gray-200 appearance-none border-2 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300"
            placeholder="Názov"
            type="text"
            v-model="title"
          />
          <p class="text-red-500" v-if="!titleIsValid">* Prosím vyplňte meno</p>
        </div>
        <div>
          <select
            class="h-[40px] w-full bg-gray-200 border-2 border-gray-200 py-2 px-4 text-gray-700 rounded leading-tight"
            v-model="type"
            name=""
            id=""
          >
            <option class="text-gray-200" disabled selected hidden value="">
              Vyberte typ
            </option>
            <option value="CD">CD</option>
            <option value="DVD">DVD</option>
            <option value="BluRay">BluRay</option>
          </select>
          <p class="text-red-500" v-if="!typeIsValid">* Prosím zvoľte typ</p>
        </div>
        <div>
          <select
            class="h-[40px] w-full bg-gray-200 border-2 border-gray-200 py-2 px-4 text-gray-700 rounded leading-tight"
            v-model="kind"
            name=""
            id=""
          >
            <option selected disabled hidden value="">Vyberte druh</option>
            <option value="Movie">Movie</option>
            <option value="Music">Music</option>
            <option value="Software">Software</option>
            <option value="Game">Game</option>
          </select>
          <p class="text-red-500" v-if="!kindIsValid">* Prosím zvoľte druh</p>
        </div>
        <div>
          <input
            class="h-[40px] w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300"
            type="number"
            placeholder="Počet diskov"
            v-model.number="number_of_discs"
          />
          <p class="text-red-500" v-if="!discsAreValid">
            * Prosím zadajte počet diskov
          </p>
        </div>
        <div>
          <input
            class="h-[40px] w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-gray-300 focus:border-gray-300"
            type="number"
            placeholder="Rok vydania"
            v-model.number="release_year"
          />
          <p class="text-red-500" v-if="!yearIsValid">
            * Prosím zadajte rok vydania
          </p>
        </div>
        <button
          class="h-[40px] rounded bg-sky-500 hover:bg-sky-600 text-white transition-all"
        >
          Pridať médium
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: {},
  props: ['medium'],
  data() {
    return {
      guid: '',
      title: '',
      type: '',
      kind: '',
      number_of_discs: '',
      release_year: '',
    }
  },
  computed: {
    titleIsValid() {
      return !!this.title
    },
    typeIsValid() {
      return !!this.type
    },
    kindIsValid() {
      return !!this.kind
    },
    discsAreValid() {
      return (
        typeof this.number_of_discs === 'number' && this.number_of_discs >= 1
      )
    },
    yearIsValid() {
      return !!this.release_year
    },
  },

  methods: {
    ...mapActions(['addMedia']),
    onSubmit(e) {
      const formIsValid =
        this.titleIsValid &&
        this.typeIsValid &&
        this.kindIsValid &&
        this.discsAreValid &&
        this.yearIsValid
      e.preventDefault()
      if (formIsValid) {
        const medium = {
          guid: uuidv4(),
          title: this.title,
          type: this.type,
          kind: this.kind,
          number_of_discs: this.number_of_discs,
          release_year: this.release_year,
        }
        this.addMedia(medium)
      }
    },
  },
  setup(props, { emit }) {
    return { emit }
  },
}
</script>
