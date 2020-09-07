import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
const store = new Vuex.Store({
 state: {
 	multilineTexts: {}
 },
 getters: {},
 mutations: {
 	UPDATE_MULTILINE_TEXTS(state, multilineTexts) {
 		state.multilineTexts = multilineTexts
 	}
 }
});

export default store;
export {default as actions} from './actions';