import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

var currentDate = new Date();
const Store = new Vuex.Store({
    state: {
        type: 2,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        firstDayOfWeek: 0 //0=SUN
    },
    getters: {
        url: function (state) {
            return '/type/' + state.type + '/date/' + state.year + '/' + state.month + '/' + state.day;
        },
        today: function (state) {
            var date = new Date();
            return '/type/' + state.type + '/date/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        },
        prevMonth: function (state) {
            return '/type/' + state.type + '/date/' + (state.month == 1 ? state.year - 1 : state.year) + '/' + (state.month == 1 ? 12 : state.month - 1) + '/' + state.day;
        },
        nextMonth: function (state) {
            return '/type/' + state.type + '/date/' + (state.month == 12 ? state.year + 1 : state.year) + '/' + (state.month == 12 ? 1 : state.month + 1) + '/' + state.day;
        },
        prevYear: function (state) {
            return '/type/' + state.type + '/date/' + (state.year - 1) + '/' + state.month + '/' + state.day;
        },
        nextYear: function (state) {
            return '/type/' + state.type + '/date/' + (state.year + 1) + '/' + state.month + '/' + state.day;
        },
    },
    mutations: {
        setType(state, payload) {
            if (!!Number(payload.type)) {
                state.type = Number(payload.type);
            }
        },
        setDate(state, payload) {
            if (!!Number(payload.year)) {
                state.year = Number(payload.year);
            }
            if (!!Number(payload.month)) {
                state.month = Number(payload.month);
            }
            if (!!Number(payload.day)) {
                state.day = Number(payload.day);
            }
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})


export { Store };
export default Store;