import _ from 'lodash';
import page from 'page';
import Ui from './ui.js';
import { Data } from './data.js'
import NProgress from 'nprogress'
import { Store } from './store.js'

var init = function () {
    page.base('/Calendar/');

    page('/type/:type/date/:year?/:month?/:day?', function (ctx) {
        console.log("route:calendar", ctx);
        Store.commit('setType', { type: ctx.params.type });
        Store.commit('setDate', {
            year: ctx.params.year,
            month: ctx.params.month,
            day: ctx.params.day
        });
        if (ctx.path != Store.getters.url) {
            page.redirect(Store.getters.url);
        }
    });
    page('/type/:type?', function (ctx) {
        Store.commit('setType', { type: ctx.params.type });
        page.redirect(Store.getters.url);
    });
    page('/date/:year?/:month?/:day?', function (ctx) {
        Store.commit('setDate', {
            year: ctx.params.year,
            month: ctx.params.month,
            day: ctx.params.day
        });
        page.redirect(Store.getters.url);
    });

    //todo export









    var langPage = function (ctx) {
        console.log("route:lang", ctx);
        Ui.setLang(ctx.params.lang);
        page.redirect('/');
    };
    page('/lang/:lang', langPage);
    page.exit('/lang/:lang', function () {
        location.reload();
    });

    var serverPage = function (ctx) {
        console.log("route:server", ctx);
        Data.setCurrentServer(ctx.params.server);
        page.redirect('/');
    };
    page('/server/:server', serverPage);
    page.exit('/server/:server', function () {
        NProgress.start();
        Data.init().then(function () {
            NProgress.done();
            location.reload();
        });
    });

    var forceInitPage = function (ctx) {
        console.log("route:forceInit", ctx);
        page.redirect('/');
    };
    page('/init/force', forceInitPage);
    page.exit('/init/force', function () {
        NProgress.start();
        Data.init().then(function () {
            NProgress.done();
            location.reload()
        });
    });

    page('/', function () {
        console.log("route:homeRoute");
        page.redirect(Store.getters.url);
    });

    page('*', function (ctx) {
        console.log("route:notMatchRoute", ctx);
        page.redirect('/');
    });
    page.start({ hashbang: true });
};

export { init };
export default { init };