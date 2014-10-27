# demo-gulp-tasks

> Gulp tasks for building the demos in OpenMusic

[![Install with NPM](https://nodei.co/npm/demo-gulp-tasks.png?downloads=true&stars=true)](https://nodei.co/npm/demo-gulp-tasks/)

This is probably super specific to this use case, but hey.

## Usage

Install first: `npm install demo-gulp-tasks`.

Then you can use it in your `gulpfile.js`:

```javascript
var gulp = require('gulp');
require('demo-gulp-tasks')(gulp);
```

## Available tasks

* build
* build-js
* build-html
* watch
* default (build and watch)

