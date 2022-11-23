import { createStore } from "vuex";

export default createStore({
  state: {
    showLoginView: true,
  },
  mutations: {
    changeStyle(state, slv) {
      console.log(123, slv);
      state.showLoginView = slv;
      console.log(state.showLoginView);
    },
  },
});
