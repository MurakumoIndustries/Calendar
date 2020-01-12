<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="row">
                    <div class="col-12 col-lg-auto">
                        <div class="chara-img-container">
                            <a target="_blank" :href="'/Actress/#!/actress/'+actress.actressId">
                                <img
                                    v-bind:src="actress.image&&('../img/chara/' + actress.image + '.png')"
                                />
                            </a>
                        </div>
                    </div>
                    <div class="col">
                        <div class="actress-resume-singleline">
                            <div class="row justify-content-center">
                                <h1 class="m-0 pb-4 text-nowrap">
                                    <ruby v-if="isNeedSplit">
                                        {{SplitedName[0]}}
                                        <rp>(</rp>
                                        <rt v-if="SplitedRuby[0]==SplitedRoma[0]">{{SplitedRuby[0]}}</rt>
                                        <rt v-else>
                                            <ruby>
                                                {{SplitedRuby[0]}}
                                                <rp>(</rp>
                                                <rt>{{SplitedRoma[0]}}</rt>
                                                <rp>)</rp>
                                            </ruby>
                                        </rt>
                                        <rp>)</rp>
                                    </ruby>
                                    <span
                                        v-if="isNeedSplit"
                                        :class="{'pr-1':!SplitMark}"
                                    >{{SplitMark}}</span>
                                    <ruby v-if="isNeedSplit">
                                        {{SplitedName[1]}}
                                        <rp>(</rp>
                                        <rt v-if="SplitedRuby[1]==SplitedRoma[1]">{{SplitedRuby[1]}}</rt>
                                        <rt v-else>
                                            <ruby>
                                                {{SplitedRuby[1]}}
                                                <rp>(</rp>
                                                <rt>{{SplitedRoma[1]}}</rt>
                                                <rp>)</rp>
                                            </ruby>
                                        </rt>
                                        <rp>)</rp>
                                    </ruby>
                                    <ruby v-else>
                                        {{actress.fullName}}
                                        <rp>(</rp>
                                        <rt>
                                            <ruby>
                                                {{actress.ruby}}
                                                <rp>(</rp>
                                                <rt>{{actress.roma}}</rt>
                                                <rp>)</rp>
                                            </ruby>
                                        </rt>
                                        <rp>)</rp>
                                    </ruby>
                                </h1>
                            </div>
                            <div class="row">
                                <div class="col-4 col-lg-2">{{Ui.getText("birthdayResume")}}</div>
                                <div class="col-8 col-lg-2 text-right">{{actress.birthday}}</div>
                                <div class="col-4 col-lg-2">{{Ui.getText("age")}}</div>
                                <div class="col-8 col-lg-2 text-right">{{actress.age}}</div>
                                <div
                                    class="col-4 col-lg-2"
                                    :title="Ui.getText('modelheight')+':'+actress.modelHeight"
                                >{{Ui.getText("height")}}</div>
                                <div class="col-8 col-lg-2 text-right">
                                    {{actress.resumeHeight}}
                                    {{Ui.getText('heightunit')}}
                                </div>
                                <div class="col-4 col-lg-2">{{Ui.getText("blood")}}</div>
                                <div class="col-8 col-lg-2 text-right">{{actress.blood}}</div>
                                <div class="col-4 col-lg-2">{{Ui.getText("job")}}</div>
                                <div class="col-8 col-lg-6 text-right">{{actress.job}}</div>
                            </div>
                            <div class="row">
                                <div class="col-auto">{{Ui.getText("cv")}}</div>
                                <div class="col text-right">{{actress.cv}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";
import $ from "jquery";
import page from "page";

var splitRegex = /[‧|・|\s]/g;

export default {
    data: function() {
        return {
            actress: {}
        };
    },
    created: function() {
        var $vm = this;

        Event.$on("detail", function(actress) {
            var isModelShow = !!($vm.actress && $vm.actress.id);
            $vm.actress = actress || {};
            if (!$vm.actress || !$vm.actress.id) {
                if (isModelShow) {
                    $($vm.$el).modal("hide");
                }
                return;
            }

            $vm.$nextTick(function() {
                $($vm.$el).modal("show");
            });
        });
    },
    computed: {
        isNeedSplit: function() {
            return splitRegex.test(this.actress.fullName);
        },
        SplitedName: function() {
            return this.actress.fullName.split(splitRegex);
        },
        SplitedRuby: function() {
            return this.actress.ruby.split(splitRegex);
        },
        SplitedRoma: function() {
            return this.actress.roma.split(splitRegex);
        },
        SplitMark: function() {
            return this.actress.fullName.match(splitRegex)[0].trim();
        }
    }
};
</script>
<style scoped>
.actress-resume-singleline {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
    padding-right: 2rem;
}

.chara-img-container {
    text-align: center;
    border: 2px solid rgb(144, 144, 144);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 2px 0px;
    min-width: 192px;
    min-height: 360px;
    box-sizing: content-box;
}
.chara-img-container > img {
    border-radius: 10px;
}
</style>

