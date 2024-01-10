import { createStore } from 'vuex';

export const store = createStore({
  state: {
    isLoading: false,
    isAdding: false,
    isDeleting: false,
    category: null,
    languages: [],
    originalSourceMessages: [],
    sourceMessages: [],
    filteredSourceMessages: [],
    page: 1,
    perPage: 40,
    displayedSourceMessages: [],
    checkedSourceMessages: [],
    modifiedMessages: {},
    modifiedMessagesKeys: [],
    search: '',
    emptyMessages: false,
    sortProperty: 'message',
    sortDirection: 'asc'
  },
  getters: {
    displayedSourceMessages: state => {
      let page = state.page;
      let perPage = state.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return state.filteredSourceMessages
        .sort((a, b) => {
          const valueA = typeof a[state.sortProperty] !== 'undefined'
            ? a[state.sortProperty]
            : a.languages[state.sortProperty];
          const valueB = typeof b[state.sortProperty] !== 'undefined'
            ? b[state.sortProperty]
            : b.languages[state.sortProperty];
          return state.sortDirection === 'asc'
            ? valueA?.localeCompare(valueB)
            : valueB?.localeCompare(valueA);
        })
        .slice(from, to);
    }
  },
  mutations: {
    setIsLoading (state, value) {
      state.isLoading = value;
    },
    setIsAdding (state, value) {
      state.isAdding = value;
    },
    setIsDeleting (state, value) {
      state.isDeleting = value;
    },
    setCategory (state, value) {
      state.category = value;
    },
    setLanguages (state, value) {
      state.languages = value;
    },
    setOriginalSourceMessages (state, value) {
      state.originalSourceMessages = value;
    },
    setSourceMessages (state, value) {
      state.sourceMessages = value;
    },
    setFilteredSourceMessages (state, value) {
      state.filteredSourceMessages = value;
    },
    setPage (state, value) {
      state.page = value;
    },
    setPerPage (state, value) {
      state.perPage = value;
    },
    setCheckedSourceMessages (state, value) {
      state.checkedSourceMessages = value;
    },
    setModifiedMessages (state, value) {
      state.modifiedMessages = value;
    },
    setModifiedMessagesKeys (state, value) {
      state.modifiedMessagesKeys = value;
    },
    setSearch (state, value) {
      state.search = value;
    },
    setEmptyMessages (state, value) {
      state.emptyMessages = value;
    },
    setSortProperty (state, value) {
      state.sortProperty = value;
    },
    setSortDirection (state, value) {
      state.sortDirection = value;
    },
  },
  actions: {
    updateLanguages ({ commit }, languages) {
      localStorage.setItem('admin-translations-languages', JSON.stringify(languages));
      commit('setLanguages', languages);
    },
    updateSourceMessages ({ commit }, newSourceMessages) {
      commit('setSourceMessages', newSourceMessages);
      commit('setFilteredSourceMessages', newSourceMessages);
      commit('setOriginalSourceMessages', JSON.parse(JSON.stringify(newSourceMessages)));
    },
    updateModifiedMessages ({ commit }, newModifiedMessages) {
      commit('setModifiedMessages', newModifiedMessages);
      commit('setModifiedMessagesKeys', Object.keys(newModifiedMessages));
    },
  },
});
