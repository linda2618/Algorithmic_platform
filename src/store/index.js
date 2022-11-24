import { createStore } from "vuex";

export default createStore({
  state: {
    showLoginView: true,
  },
  mutations: {
    changeStyle(state, slv) {
      state.showLoginView = slv;
    },
  },
});
