const isWeekend = require('date-fns/isWeekend');
const isSunday = require('date-fns/isSunday');
const getHours = require('date-fns/getHours');
const getMinutes = require('date-fns/getMinutes');
const getSeconds = require('date-fns/getSeconds');
const getMilliseconds = require('date-fns/getMilliseconds');
const addDays = require('date-fns/addDays');
const addBusinessDays = require('date-fns/addBusinessDays');
const addHours = require('date-fns/addHours');
const addMinutes = require('date-fns/addMinutes');
const setHours = require('date-fns/setHours');
const setMinutes = require('date-fns/setMinutes');
const setSeconds = require('date-fns/setSeconds');
const setMilliseconds = require('date-fns/setMilliseconds');

/**
 * 
 * @param {Date} date 
 * @param {number} minutes
 * @returns {Date}
 */
module.exports = function addBusinessMinutes(date, minutes, opts = { start: 9, end: 17 }){
    if(Math.sign(minutes) < 0)
        throw new Error('not implemented for negative minutes');

    if(minutes === 0)
        return date;

    let r = date;

    const started_on_weekend = isWeekend(date);
    const restore = {
        minutes: started_on_weekend ? 0 : getMinutes(date),
        seconds: started_on_weekend ? 0 : getSeconds(date),
        milliseconds: started_on_weekend ? 0 : getMilliseconds(date),
    };
    
    /** how many minutes in an hour */
    const hour = 60;
    
    /** how many working hours in a day */
    const day = opts.end - opts.start;

    const full_hours = Math.floor(minutes / hour);
    const full_days = Math.floor(full_hours / day);
    const rest_hours = full_hours % day;
    const rest_minutes = minutes % hour;

    if(started_on_weekend){
        r = addDays(r, isSunday(r) ? 1 : 2);
        r = setHours(setMinutes(r, 0), opts.start);
        r = setSeconds(setMilliseconds(r, 0), 0);
    }

    // fast forward full_days
    if(full_days > 0)
        r = addBusinessDays(r, full_days); //days

    // restore the minutes
    if(!started_on_weekend)
        r = setMinutes(r, restore.minutes);

    // ensure it's in valid working hours
    {
        const h = getHours(r);

        if(h >= opts.end)
            r = addBusinessDays(r, 1);
            
        if(h < opts.start || h >= opts.end){
            r = setHours(setMinutes(r, 0), opts.start);
            Object.assign(restore, { minutes: 0, seconds: 0, milliseconds: 0 });
        }
    }

    // add the rest_hours
    {
        const rem = rest_hours - (opts.end - getHours(r));
        if(rem >= 0){
            r = addBusinessDays(r, 1);
            r = setHours(setMinutes(r, restore.minutes), opts.start + rem);
        }
        else
            r = addHours(r, rest_hours);
    }

    // add the rest_minutes
    {
        const rem = rest_minutes - (hour - getMinutes(r));
        if(rem >= 0){
            if(opts.end - getHours(r) === 1){
                r = addBusinessDays(r, 1);
                r = setHours(setMinutes(r, rem), opts.start);
            }
            else
                r = addHours(setMinutes(r, rem), 1);
        }
        else
            r = addMinutes(r, rest_minutes);
    }

    // restore seconds and milliseconds
    r = setSeconds(setMilliseconds(r, restore.milliseconds), restore.seconds);
    return r;
}