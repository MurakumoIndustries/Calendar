import page from 'page';
import NProgress from 'nprogress'

import { Ui } from './ui'
import { Data } from './data'
import { useStore } from './store';

function initRouter() {
    const store = useStore();

    page.base('/Calendar/');

    page('/type/:type/date/:year?/:month?/:day?', function (ctx) {
        console.log("route:calendar", ctx);
        store.setCalendarType(ctx.params.type);
        store.setDate(ctx.params.year, ctx.params.month, ctx.params.day);
        if (ctx.path != store.url) {
            page.redirect(store.url);
        }
    });
    page('/type/:type?', function (ctx) {
        store.setCalendarType(ctx.params.type);
        page.redirect(store.url);
    });
    page('/date/:year?/:month?/:day?', function (ctx) {
        store.setDate(ctx.params.year, ctx.params.month, ctx.params.day);
        page.redirect(store.url);
    });

    //todo export










    const langPage = function (ctx) {
        console.log("route:langRoute", ctx);
        Ui.initLanguage(ctx.params.lang);
        page.redirect('/');
    };
    page('lang/:lang', langPage);
    page.exit('lang/:lang', function () {
        location.reload();
    });
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
        page.redirect(store.url);
    });

    page('*', function (ctx) {
        console.log("route:notMatchRoute", ctx);
        page.redirect('/');
    });
    page.start({ hashbang: true });
}

export { initRouter };