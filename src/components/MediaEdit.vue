<template>
  <div
    class="z-20 absolute bg-indigo-600 w-[100%] h-[100%] top-0 left-0 rounded"
  >
    <form
      @submit="onSubmit"
      action=""
      class="w-[70%] justify-center text-center mt-6 align-middle content-center grid grid-cols-3 mx-auto gap-5"
    >
      <label for="Titulok">
        <h3>Titulok</h3>
        <input
          class="w-[100%] bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Názov"
          type="text"
          v-model="title"
        />
        <p class="text-red-500" v-if="!titleIsValid">* Prosím vyplňte meno</p>
      </label>
      <label for="">
        <h3>Typ</h3>
        <select
          class="w-[100%] bg-gray-200 border-2 border-gray-200 py-2 px-4 text-gray-700 rounded leading-tight"
          name=""
          id=""
          v-model="type"
        >
          <option disabled selected hidden value="">Vyberte typ</option>
          <option value="CD">CD</option>
          <option value="DVD">DVD</option>
          <option value="BluRay">BluRay</option>
        </select>
        <p class="text-red-500" v-if="!typeIsValid">
          * Prosím zvoľte typ
        </p></label
      >
      <label for="">
        <h3>Druh</h3>
        <select
          class="w-[100%] bg-gray-200 border-2 border-gray-200 py-2 px-4 text-gray-700 rounded leading-tight"
          required
          name=""
          id=""
          v-model="kind"
        >
          <option selected disabled hidden value="">Vyberte druh</option>
          <option value="Movie">Movie</option>
          <option value="Music">Music</option>
          <option value="Software">Software</option>
          <option value="Game">Game</option>
        </select>
        <p class="text-red-500" v-if="!kindIsValid">
          * Prosím zvoľte druh
        </p></label
      >
      <label for="">
        <h3>Počet Diskov</h3>
        <input
          class="w-[100%] bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="number"
          placeholder="Počet diskov"
          v-model.number="number_of_discs"
        />
        <p class="text-red-500" v-if="!discsAreValid">
          * Prosím zadajte počet diskov
        </p></label
      >
      <label for="">
        <h3>Rok vydania</h3>
        <input
          class="w-[100%] bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="number"
          placeholder="Rok vydania"
          v-model.number="release_year"
        />
        <p class="text-red-500" v-if="!yearIsValid">
          * Prosím zadajte rok vydania
        </p></label
      >
      <div class="flex gap-3 justify-center align-middle items-center">
        <button
          class="w-[30%] h-[30%] rounded bg-gray-200 hover:bg-green-300 hover:text-white"
        >
          Save
        </button>
        <a
          @click="emit('close-popup')"
          href="#"
          class="w-[30%] h-[30%] rounded bg-gray-200 hover:bg-green-300 hover:text-white"
        >
          Close
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['medium'],
  data() {
    return {
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
    ...mapActions(['editMedia']),
    onSubmit(e) {
      e.preventDefault()
      const formIsValid =
        this.titleIsValid &&
        this.typeIsValid &&
        this.kindIsValid &&
        this.discsAreValid &&
        this.yearIsValid
      if (formIsValid) {
        const editedMedium = {
          guid: this.medium.guid,
          title: this.title,
          type: this.type,
          kind: this.kind,
          number_of_discs: this.number_of_discs,
          release_year: this.release_year,
        }
        this.editMedia(editedMedium)
      }
    },
  },
  setup(props, { emit }) {
    return { emit }
  },
}
</script>
