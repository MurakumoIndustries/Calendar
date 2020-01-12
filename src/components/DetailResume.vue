<template>
    <div>
        <div class="row">
            <div class="col-12 col-sm-auto">
                <div class="chara-img-container">
                    <img v-bind:src="chara.image&&('../img/chara/' + chara.image + '.png')" />
                </div>
                <div class="row">
                    <div class="col-4 col-sm-auto">{{Ui.getText("cv")}}</div>
                    <div class="col text-right">{{chara.exactress.cv}}</div>
                </div>
            </div>
            <div class="col">
                <div class="actress-resume-singleline">
                    <div class="row">
                        <div class="col-auto">{{Ui.getText("roma")}}</div>
                        <div class="col text-right">{{actress.roma}}</div>
                    </div>
                    <div class="row">
                        <div class="col-auto">{{Ui.getText("ruby")}}</div>
                        <div class="col text-right">{{actress.ruby}}</div>
                    </div>
                    <div class="row">
                        <div class="col-auto">{{Ui.getText("name")}}</div>
                        <div class="col text-right">{{chara.exactress.fullName}}</div>
                    </div>
                    <div class="row">
                        <div class="col-4 col-lg-2">{{Ui.getText("birthday")}}</div>
                        <div class="col-8 col-lg-2 text-right">{{chara.exactress.birthday}}</div>
                        <div class="col-4 col-lg-2">{{Ui.getText("age")}}</div>
                        <div class="col-8 col-lg-2 text-right">{{chara.exactress.age}}</div>
                        <div
                            class="col-4 col-lg-2"
                            :title="Ui.getText('modelheight')+':'+chara.exactress.modelHeight"
                        >{{Ui.getText("height")}}</div>
                        <div class="col-8 col-lg-2 text-right">
                            {{chara.exactress.resumeHeight}}
                            {{Ui.getText('heightunit')}}
                        </div>
                        <div class="col-4 col-lg-2">{{Ui.getText("blood")}}</div>
                        <div class="col-8 col-lg-2 text-right">{{chara.exactress.blood}}</div>
                        <div class="col-4 col-lg-2">{{Ui.getText("job")}}</div>
                        <div class="col-8 col-lg-6 text-right">{{chara.exactress.job}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";

export default {
    props: {
        actress: Object,
        chara: Object
    },
};
</script>
<style scoped>
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
