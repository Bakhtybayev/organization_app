import { createStore } from "vuex";
import data from "./models/data";
const store = createStore({
  modules: {
	data
  }
});

export default store;