import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

var currentDate = new Date();
const Store = new Vuex.Store({
    state: {
        type: 2,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate()
    },
    getters: {
        url: function (state) {
            return '/type/' + state.type + '/date/' + state.year + '/' + state.month + '/' + state.day;
        }
    },
    mutations: {
        setType(state, type) {
            type && (state.type = type);
        },
        setDate(state, year, month, day) {
            year && (state.year = year);
            month && (state.month = month);
            day && (state.day = day);
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})


export { Store };
export default Store;