<script setup>
import { ref, computed } from 'vue';

import { Data } from "../js/data.js";
import { Ui } from "../js/ui.js";
import { useStore, UpdateStatus } from "../js/store"

const store = useStore();

const currentServer = ref(Data.getCurrentServer());
const allServers = Data.getAllServers();

const cacheDisabled = ref(localStorage[Data.const.cacheDisableKey] === "true");
function toggleCache() {
    if (cacheDisabled.value) {
        localStorage[Data.const.cacheDisableKey] = false;
        location.reload();
        return;
    }
    if (!confirm(Ui.getText("disablecachewarning"))) {
        return;
    }
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistration()
            .then(async (registration) => {
                await registration && registration.unregister();
                localStorage[Data.const.cacheDisableKey] = true;
                location.reload();
            });
    }
};

const currentLangText = computed(() => {
    return Ui.getLangText(store.language);
});
function initLanguage(lang) {
    store.initLanguage(lang);
}

const windowWidth = ref(window.screen.width);
const windowHeight = ref(window.screen.height);

import { exportICal, exportImage } from "../js/export.js";

</script>
<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="pe-2" href="../">
                <i class="icon icon-murakumo"></i>
            </a>
            <a class="navbar-brand" title="Murakumo Industries Calendar" href="#">
                <span class="d-none d-sm-inline-block">Murakumo Industries | Calendar</span>
                <span class="d-inline-block d-sm-none">MI | Calendar</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item me-2">
                        <form class="form-inline">
                            <div class="btn-group">
                                <a :class="['btn', 'btn-light', { 'active': store.calendarType == 1 }]" href="#!/type/1">{{
                                    Ui.getText("yearly") }}</a>
                                <a :class="['btn', 'btn-light', { 'active': store.calendarType == 2 }]" href="#!/type/2">{{
                                    Ui.getText("monthly") }}</a>
                            </div>
                        </form>
                    </li>
                    <li class="nav-item me-2">
                        <a class="btn btn-light" :href="'#!' + store.today">{{ Ui.getText("today") }}</a>
                    </li>
                </ul>

                <ul class="navbar-nav my-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i class="icon icon-version"></i>
                            <div class="d-inline-block"
                                style="vertical-align: top; height: 0; margin-top: -0.325rem; padding-right: 0.25rem;">
                                <div id="server">{{ currentServer.name }}</div>
                                <div class="m-0" id="version">
                                    <i v-show="store.updateStatus === UpdateStatus.Updating"
                                        class="material-icons version-text spin">autorenew</i>
                                    <span v-show="store.updateStatus === UpdateStatus.Updating"
                                        class="version-text">Updating...</span>
                                    <span v-show="store.updateStatus === UpdateStatus.UpdateReady" class="version-text"
                                        style="font-weight: bold;color: #ff5588;">NEW!</span>
                                    <span v-show="store.updateStatus === UpdateStatus.NoUpdate" class="version-text">{{
                                        currentServer.version
                                    }}</span>
                                </div>
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <h6 class="dropdown-header">{{ Ui.getText("server") }}</h6>
                            <a v-for="o in allServers" :key="o.id" :class="['dropdown-item', o.id == currentServer.id ? 'active' : '',
                                o.disabled ? 'disabled' : '']" :href="'#!/server/' + o.id">
                                {{ o.name }}
                                <p class="m-0" style="font-size:0.75rem;line-height:0.75rem;">{{ o.version }}</p>
                            </a>
                            <div class="dropdown-divider" id="serverDivider"></div>
                            <h6 class="dropdown-header">{{ Ui.getText("externallink") }}</h6>
                            <a class="dropdown-item" href="https://colopl.co.jp/alicegearaegis/" target="_blank"
                                rel="noopener noreferrer">
                                <span class="mr-4">{{ Ui.getText("officalsite") }}</span>
                                <i class="material-icons text-black-50"
                                    style="position:absolute;right:1rem;">open_in_new</i>
                            </a>
                            <a class="dropdown-item" href="https://alice.colopl.jp/news/show" target="_blank"
                                rel="noopener noreferrer">
                                <span class="mr-4">{{ Ui.getText("officalannouncement") }}</span>
                                <i class="material-icons text-black-50"
                                    style="position:absolute;right:1rem;">open_in_new</i>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" @click="toggleCache()">{{
                                Ui.getText(cacheDisabled ?
                                    "enablecache" : "disablecache")
                            }}</a>
                            <div class="dropdown-divider"></div>
                            <div class="form-group px-2 m-0">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model.number="windowWidth" />
                                    <input type="text" class="form-control" v-model.number="windowHeight" />
                                </div>
                                <button class="btn btn-outline-primary my-2 pe-2 float-right text-nowrap" type="button"
                                    @click="exportImage(windowWidth, windowHeight)">
                                    <span>{{ Ui.getText("exportimg") }}</span>
                                    <i class="material-icons text-black-50">save_alt</i>
                                </button>
                            </div>
                            <a class="dropdown-item" href="#" @click.prevent="exportICal(store.year)">
                                <span class="me-4">{{ Ui.getText("exportical") }}</span>
                                <i class="material-icons text-black-50" style="position:absolute;right:1rem;">save_alt</i>
                            </a>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="material-icons">language</i>
                            <span id="currentLang">{{ currentLangText }}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <a v-for="lang in Ui.supportedLang" v-bind:key="lang.key" :href="'#!/lang/' + lang.key"
                                class="dropdown-item" @click="initLanguage(lang.key)">{{ lang.text }}</a>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.icon {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    display: inline-block;
    vertical-align: middle;
}

.icon.icon-version {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: -1rem;
    margin-bottom: -1rem;
    opacity: 0.5;
    background-image: url(../assets/img/version.png);
}

.icon.icon-murakumo {
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(../assets/img/murakumo.svg);
}

.version-text {
    font-size: 0.75rem;
    line-height: 0.75rem;
    vertical-align: top;
}

.spin {
    animation: spin 2s infinite linear;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>

