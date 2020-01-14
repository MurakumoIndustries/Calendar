import _ from 'lodash';

var supportedLang = [{
        key: 'ja-JP',
        text: '日本語'
    },
    {
        key: 'zh-TW',
        text: '正體中文'
    },
    {
        key: 'en-US',
        text: 'English'
    },
    {
        key: 'zh-CN',
        text: '简体中文'
    }
];
var currentLang = '';
var data = [];
//navbar
data["today"] = { "ja-JP": "今日", "zh-TW": "今日", "en-US": "Today", "zh-CN": "今天" };
data["exportimg"] = { "ja-JP": "画像のエクスポート", "zh-TW": "匯出圖像", "en-US": "Export Image", "zh-CN": "导出图片" };
data["exportical"] = { "ja-JP": "iCalカレンダー", "zh-TW": "iCal行事曆", "en-US": "iCal Calendars", "zh-CN": "iCal日历" };

data["chara"] = { "ja-JP": "キャラ", "zh-TW": "角色", "en-US": "Character", "zh-CN": "角色" };
data["originalchara"] = { "ja-JP": "オリジナル", "zh-TW": "原創", "en-US": "Original", "zh-CN": "原创" };
data["collabochara"] = { "ja-JP": "コラボ", "zh-TW": "聯動", "en-US": "Collaboration", "zh-CN": "联动" };

data["currentversion"] = { "ja-JP": "バージョン：", "zh-TW": "當前版本：", "en-US": "Current Ver.:", "zh-CN": "当前版本：" };
data["externallink"] = { "ja-JP": "外部リンク", "zh-TW": "外部鏈接", "en-US": "External Links", "zh-CN": "外部链接" };
data["officalsite"] = { "ja-JP": "公式サイト", "zh-TW": "官網", "en-US": "Offical Site", "zh-CN": "官网" };
data["officalannouncement"] = { "ja-JP": "お知らせ", "zh-TW": "遊戲公告", "en-US": "Offical Announcement", "zh-CN": "游戏公告" };

data["ui"] = { "ja-JP": "UI言語", "zh-TW": "界面語言", "en-US": "UI", "zh-CN": "界面语言" };
data["data"] = { "ja-JP": "", "zh-TW": "資料語言", "en-US": "Data", "zh-CN": "数据语言" };

data["server"] = { "ja-JP": "サーバー", "zh-TW": "伺服器", "en-US": "Server", "zh-CN": "服务器" };
data["disablecache"] = { "ja-JP": "キャッシュを無効化", "zh-TW": "停用快取", "en-US": "Disable Cache", "zh-CN": "禁用缓存", };
data["enablecache"] = { "ja-JP": "キャッシュを有効化", "zh-TW": "啟用快取", "en-US": "Enable Cache", "zh-CN": "启用缓存", };
data["disablecachewarning"] = {
    "ja-JP": "キャッシュを無効化にすると、ページの読み込みが遅くなります。無効化にしますか？",
    "zh-TW": "停用快取會使網頁載入變慢，是否確認停用？",
    "en-US": "Disabling caching will cause the page to load slowly, CONFIRM?",
    "zh-CN": "禁用缓存会导致网页加载缓慢，是否确认禁用？"
};

//resume
data["birthday"] = {
    "ja-JP": "誕生日",
    "zh-TW": "生日",
    "en-US": "Birthday",
    "zh-CN": "生日",
};
data["birthdayResume"] = {
    "ja-JP": "誕生日",
    "zh-TW": "出生日期",
    "en-US": "Date of Birth",
    "zh-CN": "出生日期",
};
data["age"] = {
    "ja-JP": "年齢",
    "zh-TW": "年齡",
    "en-US": "Age",
    "zh-CN": "年龄",
};
data["height"] = {
    "ja-JP": "身長",
    "zh-TW": "身高",
    "en-US": "Height",
    "zh-CN": "身高",
};
data["heightunit"] = {
    "ja-JP": "cm",
    "zh-TW": "cm",
    "en-US": "cm",
    "zh-CN": "cm",
};
data["modelheight"] = {
    "ja-JP": "モデル身長",
    "zh-TW": "模型身高",
    "en-US": "Model Height",
    "zh-CN": "模型身高",
};
data["blood"] = {
    "ja-JP": "血液型",
    "zh-TW": "血型",
    "en-US": "Blood",
    "zh-CN": "血型",
};
data["job"] = {
    "ja-JP": "職業",
    "zh-TW": "職業",
    "en-US": "Job",
    "zh-CN": "职业",
};
data["cv"] = {
    "ja-JP": "CV",
    "zh-TW": "CV",
    "en-US": "Voice",
    "zh-CN": "CV",
};

data["month"] = {
    1: { "ja-JP": "1月", "zh-TW": "一月", "en-US": "January", "zh-CN": "一月" },
    2: { "ja-JP": "2月", "zh-TW": "二月", "en-US": "February", "zh-CN": "二月" },
    3: { "ja-JP": "3月", "zh-TW": "三月", "en-US": "March", "zh-CN": "三月" },
    4: { "ja-JP": "4月", "zh-TW": "四月", "en-US": "April", "zh-CN": "四月" },
    5: { "ja-JP": "5月", "zh-TW": "五月", "en-US": "May", "zh-CN": "五月" },
    6: { "ja-JP": "6月", "zh-TW": "六月", "en-US": "June", "zh-CN": "六月" },
    7: { "ja-JP": "7月", "zh-TW": "七月", "en-US": "July", "zh-CN": "七月" },
    8: { "ja-JP": "8月", "zh-TW": "八月", "en-US": "August", "zh-CN": "八月" },
    9: { "ja-JP": "9月", "zh-TW": "九月", "en-US": "September", "zh-CN": "九月" },
    10: { "ja-JP": "10月", "zh-TW": "十月", "en-US": "October", "zh-CN": "十月" },
    11: { "ja-JP": "11月", "zh-TW": "十一月", "en-US": "November", "zh-CN": "十一月" },
    12: { "ja-JP": "12月", "zh-TW": "十二月", "en-US": "December", "zh-CN": "十二月" },
};

data["yearly"] = {
    "ja-JP": "年",
    "zh-TW": "年",
    "en-US": "Yearly",
    "zh-CN": "年",
};

data["monthly"] = {
    "ja-JP": "月",
    "zh-TW": "月",
    "en-US": "Monthly",
    "zh-CN": "月",
};

data["weekly"] = {
    "ja-JP": "週",
    "zh-TW": "週",
    "en-US": "Weekly",
    "zh-CN": "周",
};

//ical
data["todayisbirthday"] = {
    "ja-JP": "今日は「$1」の誕生日！",
    "zh-TW": "今天是「$1」的生日！",
    "en-US": "Today is $2($1)'s birthday!",
    "zh-CN": "今天是「$1」的生日！",
};


data[""] = {
    "ja-JP": "",
    "zh-TW": "",
    "en-US": "",
    "zh-CN": "",
};

var getText = function (key, key2) {
    if (!data[key]) {
        console.log("ui language data missing", key);
        return key;
    }
    if (key2 === undefined) {
        return data[key][getLang()] || data[key]['en-US'];
    }
    if (!data[key][key2]) {
        console.log("ui language data missing", key, key2);
        return key;
    }
    return data[key][key2][getLang()] || data[key][key2]['en-US'];
};
var getLang = function () {
    if (!currentLang) {
        setLang();
    }
    return currentLang;
};
var getLangText = function () {
    if (!currentLang) {
        setLang();
    }
    return _.find(supportedLang, function (o) {
        return o.key == currentLang;
    }).text;
};
var setLang = function (lang) {
    lang = lang || localStorage["uilang"] || navigator.language || navigator.browserLanguage;
    if (_.some(supportedLang, function (o) { return o.key == lang }) == false) {
        lang = 'ja-JP';
    }
    currentLang = lang;
    localStorage["uilang"] = lang;
};
var renderAttrText = function (textList) {
    var text = "";
    var attrList = ["normal", "thunder", "gravity", "fire", "ice",
        "light", "collapse", "theory", "nothing"
    ];
    _.each(textList, function (o, i) {
        if (o !== undefined && o !== 0) {
            text += '<span class="attr-text attr-' + attrList[i] + '">' + o + '</span>';
        }
    });
    return text;
};
var renderAttribute2nd = function (attribute2nd) {
    var text = getText("attribute", attribute2nd);
    var attrText = [];
    attrText[attribute2nd - 4] = text;
    return renderAttrText(attrText);
};
var renderDesc = function (text) {
    if (!text) {
        return text;
    }
    return text.replace(/\n/g, '<br />');
};

const Ui = {
    supportedLang,
    getText,
    getLang,
    getLangText,
    setLang,
    renderAttrText,
    renderAttribute2nd,
    renderDesc,
};

export { Ui };
export default Ui;