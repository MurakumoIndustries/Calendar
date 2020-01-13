<template>
    <div class="h-100 d-flex flex-column">
        <div class="form-row">
            <div class="col-auto text-left">
                <a class="btn btn-outline-secondary p-0 m-2" :href="'#!'+$store.getters.prevMonth">
                    <i style="font-size: 5rem;" class="material-icons">chevron_left</i>
                </a>
            </div>
            <div class="col text-center">
                <div style="font-size: 1.5rem;line-height: 2rem;">{{year}}</div>
                <div style="font-size: 3rem;line-height: 4rem;">{{paddedMonth}}</div>
            </div>
            <div class="col-auto text-right">
                <a class="btn btn-outline-secondary p-0 m-2" :href="'#!'+$store.getters.nextMonth">
                    <i style="font-size: 5rem;" class="material-icons">chevron_right</i>
                </a>
            </div>
        </div>
        <div class="flex-fill d-flex flex-column">
            <div class="row">
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
            <div v-for="i in rows" :key="i" class="row flex-fill">
                <div
                    v-for="j in 7"
                    :key="j"
                    class="col text-center date-num-container"
                    :class="{'not-in-month':!isDateInMonth(i,j),
                    'has-actress':isDateInMonth(i,j)&&hasActress(i,j)}"
                    @click="openDetail(i,j)"
                >
                    <span
                        class="date-num"
                        :class="{
                    'is-sat':(j-1+firstDayOfWeek)%7==6,
                    'is-sun':(j-1+firstDayOfWeek)%7==0,
                }"
                    >{{getDateOfMonth(i,j)}}</span>
                    <span v-if="hasActress(i,j)" class="actress-icon">
                        <img :src="'../img/chara/' + actressList[i][j][0].miniIcon + '.png'" />
                    </span>
                    <span v-if="hasActress(i,j)" class="actress-label">
                        {{actressList[i][j][0].fullName}}
                        <br />
                        {{Ui.getText('birthday')}}
                    </span>
                    <span
                        v-if="hasActress(i,j)&&actressList[i][j].length==2"
                        class="actress-icon"
                        style="top:3rem;"
                        @click.stop="openDetail(i,j,1)"
                    >
                        <img :src="'../img/chara/' + actressList[i][j][1].miniIcon + '.png'" />
                    </span>
                    <span
                        v-if="hasActress(i,j)&&actressList[i][j].length==2"
                        class="actress-label"
                        style="top:3.25rem;"
                        @click.stop="openDetail(i,j,1)"
                    >
                        {{actressList[i][j][1].fullName}}
                        <br />
                        {{Ui.getText('birthday')}}
                    </span>
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
            weekLabel: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
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
        rows: function() {
            var rows = 0;
            var firstDay = new Date(this.year, this.month - 1, 1);
            var lastDay = new Date(this.year, this.month, 0);
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
        paddedMonth: function() {
            return (this.month < 10 ? "0" : "") + this.month;
        },
        ...mapState(["year", "month", "day", "firstDayOfWeek"])
    },
    methods: {
        getDate: function(row, col) {
            var firstDay = new Date(this.year, this.month - 1, 1);
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
        getDateOfMonth: function(row, col) {
            return this.getDate(row, col).getDate();
        },
        isDateInMonth: function(row, col) {
            return this.getDate(row, col).getMonth() + 1 == this.month;
        },
        getActressList: function(row, col) {
            return Data.getByBirthDate(this.getDate(row, col));
        },
        updateActressList: function() {
            this.actressList = [];
            for (var i = 1; i <= this.rows; i++) {
                this.actressList[i] = [];
                for (var j = 1; j <= 7; j++) {
                    this.actressList[i][j] = this.getActressList(i, j);
                }
            }
        },
        hasActress: function(row, col) {
            return (
                this.actressList[row] &&
                this.actressList[row][col] &&
                this.actressList[row][col].length
            );
        },
        openDetail: function(row, col, index) {
            if (!this.hasActress(row, col)) {
                return;
            }
            if (!this.isDateInMonth(row, col)) {
                return;
            }
            if (!index) {
                index = 0;
            }
            Event.$emit("detail", this.actressList[row][col][index]);
        }
    },
    components: {}
};
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

.date-label-container {
    position: relative;
    padding: 0 0 2rem 0;
}
.date-label-container .date-label {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 3rem;
}

.date-num-container {
    position: relative;
    padding: 0 0 3rem 0;
    user-select: none;
}
.date-num-container.has-actress {
    cursor: pointer;
}
.date-num-container .date-num {
    position: absolute;
    top: 1.75rem;
    left: 0.5rem;
    width: 3rem;
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
.date-num-container .actress-icon {
    position: absolute;
    left: 1rem;
    top: 0rem;
}
.date-num-container .actress-icon img {
    width: 2rem;
}
.date-num-container .actress-label {
    text-align: left;
    position: absolute;
    left: 3rem;
    top: 0.25rem;
    padding-right: 0.5rem;
}
@include media-breakpoint-down(md) {
    .date-num-container .actress-label {
        display: none;
    }
}
</style>


