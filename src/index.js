import 'popper.js'
import 'bootstrap';

import './style.scss'

import Vue from 'vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.start();

import Ui from './js/ui.js';
import Router from './js/router.js';
import { Data } from './js/data.js'
import { Event } from "./js/event.js";
import { Store } from './js/store.js';
import App from './App.vue';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

NProgress.set(0.1);
//Ui.init();
Vue.prototype.Ui = Ui;
NProgress.set(0.3);
Data.init().then(function () {
    NProgress.set(0.5);
    if (localStorage["MI_Calendar_Disable_Cache"] !== "true") {
        OfflinePluginRuntime.install({
            onUpdating: function () {
                Event.$emit('new-version-updating');
            },
            onUpdateReady: function () {
                Event.$emit('new-version-update-ready');
                OfflinePluginRuntime.applyUpdate();
            }
        });
        console.log('PWA Enabled!');
    }
    NProgress.set(0.7);
    Router.init();
    NProgress.set(0.9);
    document.getElementsByTagName('body')[0].setAttribute('lang', Ui.getLang());
    var $vm = new Vue({
        el: '#app',
        store: Store,
        //template: '<App/>',
        render: function (h) {
            return h('App')
        },
        components: { App }
    });
    NProgress.done();
});