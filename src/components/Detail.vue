<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content background actress-resume-container">
                <div class="row">
                    <div class="col-12 col-lg-auto text-center">
                        <div class="chara-img-container">
                            <a target="_blank" :href="'/Actress/#!/actress/' + actress.actressId">
                                <img v-bind:src="actress.image && ('../assets/img/chara/' + actress.image + '.png')" />
                            </a>
                        </div>
                    </div>
                    <div class="col">
                        <div class="actress-resume-singleline">
                            <div class="row justify-content-center">
                                <p class="actress-name" :class="{
                                    'actress-name-long': actress.fullName && actress.fullName.length > 7,
                                    'actress-name-long-x2': actress.fullName && actress.fullName.length > 14,
                                    'actress-name-foreigner': actress.ruby == actress.roma
                                }">
                                    <ruby v-if="isNeedSplit">
                                        {{ SplitedName[0] }}
                                        <rp>(</rp>
                                        <rt v-if="SplitedRuby[0] == SplitedRoma[0]">{{ SplitedRuby[0] }}</rt>
                                        <rt v-else>
                                            <ruby>
                                                {{ SplitedRuby[0] }}
                                                <rp>(</rp>
                                                <rt>{{ SplitedRoma[0] }}</rt>
                                                <rp>)</rp>
                                            </ruby>
                                        </rt>
                                        <rp>)</rp>
                                    </ruby>
                                    <span v-if="isNeedSplit" :class="{ 'pe-1': !SplitMark }">{{ SplitMark }}</span>
                                    <ruby v-if="isNeedSplit">
                                        {{ SplitedName[1] }}
                                        <rp>(</rp>
                                        <rt v-if="SplitedRuby[1] == SplitedRoma[1]">{{ SplitedRuby[1] }}</rt>
                                        <rt v-else>
                                            <ruby>
                                                {{ SplitedRuby[1] }}
                                                <rp>(</rp>
                                                <rt>{{ SplitedRoma[1] }}</rt>
                                                <rp>)</rp>
                                            </ruby>
                                        </rt>
                                        <rp>)</rp>
                                    </ruby>
                                    <ruby v-else>
                                        {{ actress.fullName }}
                                        <rp>(</rp>
                                        <rt>
                                            <ruby>
                                                {{ actress.ruby }}
                                                <rp>(</rp>
                                                <rt>{{ actress.roma }}</rt>
                                                <rp>)</rp>
                                            </ruby>
                                        </rt>
                                        <rp>)</rp>
                                    </ruby>
                                </p>
                            </div>
                            <div class="row">
                                <div class="col-4 col-lg-2">{{ Ui.getText("birthdayResume") }}</div>
                                <div class="col-8 col-lg-2 text-right">{{ actress.birthday }}</div>
                                <div class="col-4 col-lg-2">{{ Ui.getText("age") }}</div>
                                <div class="col-8 col-lg-2 text-right">{{ actress.age }}</div>
                                <div class="col-4 col-lg-2" :title="Ui.getText('modelheight') + ':' + actress.modelHeight">
                                    {{ Ui.getText("height") }}</div>
                                <div class="col-8 col-lg-2 text-right">
                                    {{ actress.resumeHeight }}
                                    {{ Ui.getText('heightunit') }}
                                </div>
                                <div class="col-4 col-lg-2">{{ Ui.getText("blood") }}</div>
                                <div class="col-8 col-lg-2 text-right">{{ actress.blood }}</div>
                                <div class="col-4 col-lg-2">{{ Ui.getText("job") }}</div>
                                <div class="col-8 col-lg-6 text-right">{{ actress.job }}</div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-auto">{{ Ui.getText("cv") }}</div>
                                <div class="col text-right">{{ actress.cv }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="actress-collabo text-black-50" v-if="actress.isCollabo">{{ Ui.getText('collabochara') }}
                </div>
                <button type="button" class="close btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";
import { Modal } from "bootstrap";
import { mapActions } from "pinia";
import { useStore } from '../js/store';

const splitRegex = /[.|‧|・|\s]/g;

export default {
    props: {
        actressId: undefined
    },
    created: function () {
        var $vm = this;
        $vm.$nextTick(function () {
            $vm.$el.addEventListener('hidden.bs.modal', function (e) {
                $vm.resetCurrentActress();
            });
        });
    },
    mounted: function () {
        if (!(this.actressId)) {
            const modal = Modal.getInstance(this.$el);
            modal && modal.hide();
            return;
        }
    },
    watch: {
        actressId: function (newId, oldId) {
            if (!newId) {
                const modal = Modal.getInstance(this.$el);
                modal && modal.hide();
                return;
            }
            this.$nextTick(function () {
                const modal = Modal.getOrCreateInstance(this.$el);
                modal && modal.show();
            });
        }
    },
    computed: {
        actress: function () {
            return Data.get("calendar", this.actressId) || {};
        },
        isNeedSplit: function () {
            return splitRegex.test(this.actress.fullName);
        },
        SplitedName: function () {
            return this.actress.fullName.split(splitRegex);
        },
        SplitedRuby: function () {
            return this.actress.ruby.split(splitRegex);
        },
        SplitedRoma: function () {
            return this.actress.roma.split(splitRegex);
        },
        SplitMark: function () {
            return this.actress.fullName.match(splitRegex)[0].trim();
        }
    },
    methods: {
        ...mapActions(useStore, ['resetCurrentActress']),
    }
};
</script>
<style lang="scss" scoped>
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";


.actress-resume-container {
    border-top-right-radius: 0;
}

@include media-breakpoint-up(lg) {
    .actress-resume-container {
        border-radius: 1rem 0 1rem 0;
    }
}

.actress-name {
    font-size: 2.5rem;
    font-weight: 500;
    margin: 0;
    padding: 1rem 0 1rem 0;
    white-space: nowrap;
}

.actress-name-long-x2 {
    font-size: 2.25rem;
}

.actress-name-foreigner {
    padding-top: 0;
}

@include media-breakpoint-down(md) {
    .actress-name {
        padding-bottom: 0;
    }

    .actress-name-long {
        font-size: 2rem;
    }
}

.actress-resume-singleline {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;
    padding-right: 2rem;
}

@include media-breakpoint-down(md) {
    .actress-resume-singleline {
        padding: 1rem 1rem 0.5rem 1rem;
    }
}

.chara-img-container {
    display: inline-block;
    text-align: center;
    border: 2px solid rgb(144, 144, 144);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: rgba(0, 0, 0, 0.25) 2px 2px 2px 0px;
    min-width: 192px;
    min-height: 360px;
    box-sizing: content-box;
}

.chara-img-container>img {
    border-radius: 10px;
}

.actress-collabo {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.5rem;
}

@include media-breakpoint-down(md) {
    .actress-collabo {
        left: 0;
        top: 0;
        right: unset;
        bottom: unset;
    }
}

.close {
    position: absolute;
    right: 0;
    top: 0;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #ddd;
}
</style>

