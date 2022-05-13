import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    media: [],
    searchWord: null,
    searchDiscs: null,
    searchYear: null,
    filteredMedia: null,
    type: null,
    kind: null,
  },
  getters: {
    allMedia: (state) => state.media,
    getSearchWord: (state) => state.searchWord,
    getFilteredMedia: (state) => state.filteredMedia,
    filteredByTitle: (state) => state.filteredByTitle,
    filteredByKind: (state) => state.filteredByKind,
    filteredByDiscs: (state) => state.searchDiscs,
    filteredByYear: (state) => state.searchYear,
  },
  mutations: {
    SET_MEDIA(state, media) {
      state.media = media
      state.originalMedia = media
    },
    ADD_MEDIUM(state, medium) {
      state.media.unshift(medium)
    },
    DELETE_MEDIUM(state, medium) {
      state.media = state.media.filter((t) => medium.guid !== t.guid)
    },
    EDIT_MEDIUM: (state, editedMedium) => {
      state.media.findIndex((t) => t.guid === editedMedium.guid)
    },

    FILTERED_MEDIA(state, word) {
      if (!word || word === '{}') {
        state.searchWord = null
        state.filteredMedia = null
      } else {
        state.searchWord = word

        word = word.trim().toLowerCase()
        state.filteredMedia = state.media.filter((medium) => {
          return medium.title.toLowerCase().includes(word)
        })
      }
    },
    FILTERED_DISCS(state, discs) {
      if (!discs || discs === '{}') {
        state.searchDiscs = null
        state.filteredMedia = null
      } else {
        state.searchDiscs = discs
        const mediumm = state.media.number_of_discs
        const numberasstring = String(mediumm)
        //discs = isInteger
        state.filteredMedia = state.media.filter(() => {
          return numberasstring.includes(discs)
          //medium.number_of_discs + discs
        })
      }
    },
    FILTERED_TYPE(state, type) {
      if (!type || type === '{}') {
        state.mediaType = null
        state.filteredMedia = null
      } else {
        state.mediaType = type

        state.filteredMedia = state.media.filter((medium) => {
          return medium.type.includes(type)
        })
      }
    },
    FILTERED_KIND(state, kind) {
      if (!kind || kind === '{}') {
        state.mediaKind = null
        state.filteredMedia = null
      } else {
        state.mediaKind = kind

        state.filteredMedia = state.media.filter((medium) => {
          return medium.kind.includes(kind)
        })
      }
    },
    FILTERED_YEAR(state, year) {
      if (!year || year === '{}') {
        state.searchYear = null
        state.filteredMedia = null
      } else {
        state.searchYear = year
        year = year.trim().toLowerCase()
        state.filteredMedia = state.media.filter((medium) => {
          return medium.release_year.toLowerCase().includes(year)
        })
      }
    },
  },
  actions: {
    filteredByKind({ commit }, kind) {
      commit('FILTERED_KIND', kind)
    },
    filteredByType({ commit }, type) {
      commit('FILTERED_TYPE', type)
    },
    filteredByDiscs({ commit }, discs) {
      commit('FILTERED_DISCS', discs)
    },
    filteredByYear({ commit }, year) {
      commit('FILTERED_YEAR', year)
    },
    FILTERED_MEDIA({ commit }, word) {
      commit('FILTERED_MEDIA', word)
    },

    async getMedia({ commit }) {
      await axios.get('http://localhost:3000/api/v1/media').then((response) => {
        commit('SET_MEDIA', response.data)
      })
    },

    async addMedia({ commit }, medium) {
      await axios
        .post('http://localhost:3000/api/v1/media', medium)
        .then((response) => {
          commit('ADD_MEDIUM', response.data)
        })
    },
    async removeMedia({ commit }, medium) {
      await axios
        .delete(`http://localhost:3000/api/v1/media/${medium.guid}`)
        .then(() => {
          commit('DELETE_MEDIUM', medium)
        })
    },
    async editMedia({ commit }, medium) {
      await axios
        .put(`http://localhost:3000/api/v1/media/${medium.guid}`, medium)
        .then((response) => {
          commit('EDIT_MEDIUM', response.data)
        })
    },
  },
  modules: {},
})
