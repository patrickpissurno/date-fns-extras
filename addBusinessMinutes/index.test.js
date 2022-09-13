const tap = require('tap');

const dF = require('date-fns');
const addBusinessMinutes = require('.');

const FORMAT = 'yyyy-MM-dd HH:mm:ss';

tap.throws(() => addBusinessMinutes(new Date(), -1), 'not implemented for negative minutes');

{
    const i = new Date();
    tap.equal(addBusinessMinutes(i, 0), i, `date shall not change if minutes = 0`);
}

{
    const i = dF.parse('2022-09-03 13:00:00', FORMAT, new Date());
    const e = dF.parse('2022-09-05 09:01:00', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 1, { start: 9, end: 17 }), e, `starting on saturday should work`);
}

{
    const i = dF.parse('2022-09-04 13:00:00', FORMAT, new Date());
    const e = dF.parse('2022-09-05 09:01:00', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 1, { start: 9, end: 17 }), e, `starting on sunday should work`);
}

{
    const i = dF.parse('2022-09-04 13:00:00', FORMAT, new Date());
    const e = dF.parse('2022-09-19 09:00:00', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 10 * 8 * 60, { start: 9, end: 17 }), e, `adding two weeks should work (starting on weekend)`);
}

{
    const i = dF.parse('2022-09-05 09:30:20', FORMAT, new Date());
    const e = dF.parse('2022-09-19 09:30:20', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 10 * 8 * 60, { start: 9, end: 17 }), e, `adding two weeks should work (starting on weekdays)`);
}

{
    const i = dF.parse('2022-09-05 07:10:24', FORMAT, new Date());
    const e = dF.parse('2022-09-19 09:00:00', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 10 * 8 * 60, { start: 9, end: 17 }), e, `adding two weeks should work (starting on weekdays before working hours)`);
}

{
    const i = dF.parse('2022-09-05 17:30:20', FORMAT, new Date());
    const e = dF.parse('2022-09-20 09:00:00', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 10 * 8 * 60, { start: 9, end: 17 }), e, `adding two weeks should work (starting on weekdays after working hours)`);
}

{
    const i = dF.parse('2022-09-05 09:00:00', FORMAT, new Date());
    const e = dF.parse('2022-09-15 09:00:00', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 8 * 8 * 60, { start: 9, end: 17 }), e, `adding a week and three days should work`);
}

{
    const i = dF.parse('2022-09-09 16:09:06', FORMAT, new Date());
    const e = dF.parse('2022-09-12 10:09:06', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 2 * 60, { start: 9, end: 17 }), e, `adding two hours should work (should jump to the next business day)`);
}

{
    const i = dF.parse('2022-09-09 16:30:24', FORMAT, new Date());
    const e = dF.parse('2022-09-12 09:20:24', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 50, { start: 9, end: 17 }), e, `adding 50 minutes should work (should jump to the next business day)`);
}

{
    const i = dF.parse('2022-09-09 14:30:24', FORMAT, new Date());
    const e = dF.parse('2022-09-09 15:20:24', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, 50, { start: 9, end: 17 }), e, `adding 50 minutes should work (should not jump to the next business day)`);
}

{
    const i = dF.parse('2022-09-01 16:30:24', FORMAT, new Date());
    const e = dF.parse('2022-09-12 16:20:24', FORMAT, new Date());
    tap.same(addBusinessMinutes(i, (6 * 8 * 60) + (7 * 60) + 50, { start: 9, end: 17 }), e, `adding a week, a day, 7 hours and 50 minutes should work (should jump to the next business day)`);
}