<template>
    <div class="d-flex flex-column h-100">
        <div class="form-row">
            <div class="col-auto text-left">
                <a class="btn btn-outline-secondary p-0 m-2" :href="'#!'+$store.getters.prevYear">
                    <i style="font-size: 3rem;" class="material-icons">chevron_left</i>
                </a>
            </div>
            <div class="col text-center">
                <div style="font-size: 3rem;line-height: 4rem;">{{year}}</div>
            </div>
            <div class="col-auto text-right">
                <a class="btn btn-outline-secondary p-0 m-2" :href="'#!'+$store.getters.nextYear">
                    <i style="font-size: 3rem;" class="material-icons">chevron_right</i>
                </a>
            </div>
        </div>
        <div
            class="flex-fill d-flex flex-column"
            style="height:calc(100% - 4rem);
    overflow-y: auto;
    overflow-x: hidden;"
        >
            <div class="row flex-fill">
                <div
                    v-for="month in 12"
                    :key="month"
                    class="col-12 col-sm-6 col-md-4 col-lg-3 pt-0 pb-4 px-4"
                >
                    <div class="row max-width">
                        <h5 class="col text-center">{{paddedMonth(month)}}</h5>
                    </div>
                    <div class="row max-width">
                        <div
                            v-for="labelIndex in 7"
                            :key="labelIndex"
                            class="col text-center date-label-container"
                        >
                            <span
                                class="date-label"
                                :class="{                       
                    'is-sat':(labelIndex-1+firstDayOfWeek)%7==6,
                    'is-sun':(labelIndex-1+firstDayOfWeek)%7==0,
                    }"
                            >{{weekLabel[(labelIndex-1+firstDayOfWeek)%7]}}</span>
                        </div>
                    </div>
                    <div v-for="i in rows(month)" :key="i" class="row max-width">
                        <div
                            v-for="j in 7"
                            :key="j"
                            class="col text-center date-num-container"
                            :class="{
                                'not-in-month':!isDateInMonth(month,i,j),
                                'has-actress':isDateInMonth(month,i,j)&&hasActress(month,i,j)
                            }"
                        >
                            <div
                                v-if="isDateInMonth(month,i,j)&&hasActress(month,i,j)"
                                class="actress-icon"
                            >
                                <div
                                    v-if="actressList[month][i][j].length==1"
                                    :style="{'background-color':actressList[month][i][j][0].imageColor}"
                                    :title="getDateOfMonth(month,i,j)+' '+actressList[month][i][j][0].name"
                                    @click="openDetail(month,i,j)"
                                >
                                    <img
                                        :src="'../img/chara/' + actressList[month][i][j][0].miniIcon + '.png'"
                                    />
                                </div>
                                <div
                                    v-else-if="actressList[month][i][j].length==2"
                                    class="actress-icon-2-icons"
                                >
                                    <div
                                        class="icon-1"
                                        :style="{'background-color':actressList[month][i][j][0].imageColor}"
                                        :title="getDateOfMonth(month,i,j)+' '+actressList[month][i][j][0].name"
                                        @click="openDetail(month,i,j,0)"
                                    >
                                        <img
                                            :src="'../img/chara/' + actressList[month][i][j][0].miniIcon + '.png'"
                                        />
                                    </div>
                                    <div
                                        class="icon-2"
                                        :style="{'background-color':actressList[month][i][j][1].imageColor}"
                                        :title="getDateOfMonth(month,i,j)+' '+actressList[month][i][j][1].name"
                                        @click="openDetail(month,i,j,1)"
                                    >
                                        <img
                                            :src="'../img/chara/' + actressList[month][i][j][1].miniIcon + '.png'"
                                        />
                                    </div>
                                </div>
                                <div v-else>3 actress in same day?!</div>
                            </div>
                            <div
                                v-else
                                class="date-num"
                                :class="{
                    'is-sat':(j-1+firstDayOfWeek)%7==6,
                    'is-sun':(j-1+firstDayOfWeek)%7==0,
                }"
                            >{{getDateOfMonth(month,i,j)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";

import { Data } from "../js/data.js";
import { Event } from "../js/event.js";

export default {
    data: function() {
        return {
            weekLabel: ["S", "M", "T", "W", "T", "F", "S"],
            actressList: []
        };
    },
    beforeMount: function() {
        this.updateActressList();
    },
    beforeUpdate: function() {
        this.updateActressList();
    },
    computed: {
        ...mapState(["year", "firstDayOfWeek"])
    },
    methods: {
        rows: function(month) {
            var rows = 0;
            var firstDay = new Date(this.year, month - 1, 1);
            var lastDay = new Date(this.year, month, 0);
            if (firstDay.getDay() < this.firstDayOfWeek) {
                firstDay.setDate(
                    this.firstDayOfWeek -
                        firstDay.getDay() -
                        7 +
                        firstDay.getDate()
                );
            } else {
                firstDay.setDate(
                    this.firstDayOfWeek - firstDay.getDay() + firstDay.getDate()
                );
            }
            if (lastDay.getDay() < this.firstDayOfWeek) {
                lastDay.setDate(
                    this.firstDayOfWeek -
                        lastDay.getDay() -
                        7 +
                        lastDay.getDate()
                );
            } else {
                lastDay.setDate(
                    this.firstDayOfWeek - lastDay.getDay() + lastDay.getDate()
                );
            }
            return (
                Math.floor((lastDay - firstDay) / 1000 / 60 / 60 / 24 / 7) + 1
            );
        },
        paddedMonth: function(month) {
            return (month < 10 ? "0" : "") + month;
        },
        getDate: function(month, row, col) {
            var firstDay = new Date(this.year, month - 1, 1);
            if (firstDay.getDay() < this.firstDayOfWeek) {
                firstDay.setDate(
                    this.firstDayOfWeek -
                        firstDay.getDay() -
                        7 +
                        firstDay.getDate()
                );
            } else {
                firstDay.setDate(
                    this.firstDayOfWeek - firstDay.getDay() + firstDay.getDate()
                );
            }
            firstDay.setDate(firstDay.getDate() + (row - 1) * 7 + col - 1);
            return firstDay;
        },
        getDateOfMonth: function(month, row, col) {
            return this.getDate(month, row, col).getDate();
        },
        isDateInMonth: function(month, row, col) {
            return this.getDate(month, row, col).getMonth() + 1 == month;
        },
        getActressList: function(month, row, col) {
            return Data.getByBirthDate(this.getDate(month, row, col));
        },
        updateActressList: function() {
            this.actressList = [];
            for (var m = 1; m <= 12; m++) {
                this.actressList[m] = [];
                for (var i = 1; i <= this.rows(m); i++) {
                    this.actressList[m][i] = [];
                    for (var j = 1; j <= 7; j++) {
                        this.actressList[m][i][j] = this.getActressList(
                            m,
                            i,
                            j
                        );
                    }
                }
            }
        },
        hasActress: function(month, row, col) {
            return (
                this.actressList[month] &&
                this.actressList[month][row] &&
                this.actressList[month][row][col] &&
                this.actressList[month][row][col].length
            );
        },
        openDetail: function(month, row, col, index) {
            if (!this.hasActress(month, row, col)) {
                return;
            }
            if (!this.isDateInMonth(month, row, col)) {
                return;
            }
            if (!index) {
                index = 0;
            }
            Event.$emit("detail", this.actressList[month][row][col][index]);
        }
    },
    components: {}
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

.max-width {
    max-width: 20rem;
    margin: auto;
}

.date-label-container {
    position: relative;
    padding: 0;
}
.date-label-container .date-label {
}

.date-num-container {
    position: relative;
    padding: 0;
    user-select: none;
}
.date-num-container.has-actress {
    cursor: pointer;
}
.date-num-container .date-num {
    line-height: 1.5rem;
    padding-top: 0.5rem;
}

.date-num-container.not-in-month {
    filter: blur(3px);
    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='svgMask'><feGaussianBlur stdDeviation='3' /></filter></svg>#svgMask");
}
.date-num-container.not-in-month .date-num {
    color: #bbb !important;
}

.is-sat {
    color: #0099ff;
}
.is-sun {
    color: #ff0099;
}
.date-num-container .actress-icon img {
    width: 2rem;
}
.date-num-container .actress-icon .actress-icon-2-icons {
    position: relative;
}
.date-num-container .actress-icon .actress-icon-2-icons > .icon-1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    clip-path: polygon(0% 0%, 75% 0, 25% 100%, 0% 100%);
    transition: clip-path 1s, z-index 1s step-end;
}
.date-num-container .actress-icon .actress-icon-2-icons > .icon-2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    clip-path: polygon(75% 0%, 100% 0%, 100% 100%, 25% 100%);
    transition: clip-path 1s, z-index 1s step-end;
}
.date-num-container .actress-icon .actress-icon-2-icons > .icon-1:hover,
.date-num-container .actress-icon .actress-icon-2-icons > .icon-2:hover {
    z-index: 2;
    clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 100%);
    transition: clip-path 1s, z-index 1s step-start;
}
</style>


