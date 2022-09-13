# date-fns-extras
[![npm-version](https://img.shields.io/npm/v/date-fns-extras.svg)](https://www.npmjs.com/package/date-fns-extras)
[![coverage status](https://coveralls.io/repos/github/patrickpissurno/date-fns-extras/badge.svg?branch=master)](https://coveralls.io/github/patrickpissurno/date-fns-extras?branch=master)
[![known vulnerabilities](https://snyk.io/test/github/patrickpissurno/date-fns-extras/badge.svg)](https://snyk.io/test/github/patrickpissurno/date-fns-extras)
[![downloads](https://img.shields.io/npm/dt/date-fns-extras.svg)](http://npm-stats.com/~packages/date-fns-extras)
[![license](https://img.shields.io/github/license/patrickpissurno/date-fns-extras.svg?maxAge=1800)](https://github.com/patrickpissurno/date-fns-extras/blob/master/LICENSE)

Some extra utilities not found in date-fns

## Install

```
npm i date-fns-extras
```

## How to import

```js
const addBusinessMinutes = require('date-fns-extras/addBusinessMinutes');
// or
const { addBusinessMinutes } = require('date-fns-extras');
// or
const addBusinessMinutes = require('date-fns-extras').addBusinessMinutes;
// or
import { addBusinessMinutes } from 'date-fns-extras';
```

## addBusinessMinutes(date, minutes, opts = { start: 9, end: 17 })

```js
const parse = require('date-fns/parse');
const addBusinessMinutes = require('date-fns-extras/addBusinessMinutes');

const date = parse('2022-09-02 16:30:00', 'yyyy-MM-dd HH:mm:ss', new Date());
console.log(addBusinessMinutes(date, 32)); //returns: 2022-09-05 09:02:00
```

The `start` and the `end` options allow the working hours to be specified. By default: 9am to 5pm.
It doesn't take breaks (eg. lunch) into account, keep that in mind.

## Production-ready?
Yes. This library has a strict 100% coverage policy. Tests are run for every commit to ensure safety.

## License

MIT License

Copyright (c) 2022 Patrick Pissurno

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.