import _ from 'lodash';
import ICAL from 'ical.js';
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { toBlob } from 'html-to-image';

import { Data } from './data.js';
import { Ui } from './ui.js';

const generate = function (year) {
    var comp = new ICAL.Component('vcalendar');
    comp.updatePropertyWithValue('prodid', '-//Murakumo Industries/iCalendar');
    comp.updatePropertyWithValue('version', '2.0');
    comp.updatePropertyWithValue('calscale', 'GREGORIAN')
    comp.updatePropertyWithValue('method', 'PUBLISH')

    var actressList = Data.getAll('calendar');
    _.each(actressList, function (actress) {
        if (actress.name == "アクトレス" || actress.fullName == "アクトレス") {
            return;
        }
        if (actress.birthday == "1/1") {
            return;
        }
        var birth = actress.birthday.split('/');
        if (birth.length != 2 || isNaN(Number(birth[0])) || isNaN(Number(birth[1]))) {
            return;
        }

        var vevent = new ICAL.Component('vevent'),
            event = new ICAL.Event(vevent);

        // Set standard properties
        event.summary = actress.name + ' ' + Ui.getText('birthday');
        if (Ui.getLang() == 'en-US') {
            event.summary = actress.roma + '(' + actress.name + ')\'s ' + Ui.getText('birthday');
        }
        event.description = Ui.getText('todayisbirthday')
            .replace('$1', actress.fullName)
            .replace('$2', actress.roma);
        event.uid = 'MI_Calendar_Actress_' + actress.actressId;
        event.startDate = new ICAL.Time({
            year: Number(year),
            month: Number(birth[0]),
            day: Number(birth[1]),
            isDate: true
        });
        event.endDate = new ICAL.Time({
            year: Number(year),
            month: Number(birth[0]),
            day: Number(birth[1]) + 1,
            isDate: true
        });
        event.location = "アリス・ギア・アイギス";
        event.sequence = 0;

        var valarm = new ICAL.Component('valarm');
        valarm.updatePropertyWithValue('ACTION', 'DISPLAY')
        valarm.updatePropertyWithValue('DESCRIPTION', event.description)
        valarm.updatePropertyWithValue('TRIGGER', 'P0D')
        vevent.addSubcomponent(valarm);
        // Add the new component
        comp.addSubcomponent(vevent);
    })
    return comp.toString();
};
const exportICal = (year) => {
    var ical = generate(year);
    var blob = new Blob([ical], { type: "text/plain;charset=utf-8" });
    saveAs(blob, year + "_" + Ui.getLang() + ".ics");
};
const exportImage = (width, height) => {
    html2canvas(document.getElementsByClassName("main-container")[0], {
        width: width,
        height: height,
        windowWidth: width,
        windowHeight: height,
        onclone: function (node) {
            node.documentElement.classList.remove("h-100");
            node.documentElement.style.width = width + "px";
            node.documentElement.style.height = height + "px";
        },
        ignoreElements: function (node) {
            if (node.classList && node.classList.contains("modal")) {
                return true;
            }
            if (node.classList && node.classList.contains("btn")) {
                return true;
            }
            return false;
        }
    }).then(function (canvas) {
        canvas.toBlob(function (blob) {
            saveAs(blob, "calendar.png");
        });
    });
};

export { exportICal, exportImage };