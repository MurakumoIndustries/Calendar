import _ from 'lodash';
import ICAL from 'ical.js';

import { Data } from './data.js';
import { Ui } from './ui.js';

var generate = function (year) {
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
}

const iCalendar = {
    generate
};

export { iCalendar };
export default iCalendar;