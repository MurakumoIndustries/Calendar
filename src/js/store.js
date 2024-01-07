import { defineStore } from 'pinia'
import { Ui } from './ui'

const UpdateStatus = {
    NoUpdate: 0,
    Updating: 1,
    UpdateReady: 2
};

var currentDate = new Date();
const useStore = defineStore('main', {
    state: () => ({
        updateStatus: UpdateStatus.NoUpdate,
        language: Ui.initLanguage(),
        isExperimentalMode: false,
        isEasterMode: false,
        currentActressId: 0,
        calendarType: 2,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        firstDayOfWeek: 0 //0=SUN
    }),
    getters: {
        url: (state) => '/type/' + state.calendarType + '/date/' + state.year + '/' + state.month + '/' + state.day,
        today: (state) => {
            var date = new Date();
            return '/type/' + state.calendarType + '/date/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        },
        prevMonth: (state) => '/type/' + state.calendarType + '/date/' + (state.month == 1 ? state.year - 1 : state.year) + '/' + (state.month == 1 ? 12 : state.month - 1) + '/' + state.day,
        nextMonth: (state) => '/type/' + state.calendarType + '/date/' + (state.month == 12 ? state.year + 1 : state.year) + '/' + (state.month == 12 ? 1 : state.month + 1) + '/' + state.day,
        prevYear: (state) => '/type/' + state.calendarType + '/date/' + (state.year - 1) + '/' + state.month + '/' + state.day,
        nextYear: (state) => '/type/' + state.calendarType + '/date/' + (state.year + 1) + '/' + state.month + '/' + state.day,
    },
    actions: {
        updating() {
            console.log("new-version-updating");
            this.updateStatus = UpdateStatus.Updating;
        },
        updateReady() {
            console.log("new-version-update-ready");
            this.updateStatus = UpdateStatus.UpdateReady;
        },
        initLanguage(lang) {
            this.language = Ui.initLanguage(lang);
        },
        resetCurrentActress() {
            this.currentActressId = undefined;
        },
        setCalendarType(type) {
            if (!!Number(type)) {
                this.calendarType = Number(type);
            }
        },
        setDate(year, month, day) {
            if (!!Number(year)) {
                this.year = Number(year);
            }
            if (!!Number(month)) {
                this.month = Number(month);
            }
            if (!!Number(day)) {
                this.day = Number(day);
            }
        }
    }
})

export { useStore, UpdateStatus };