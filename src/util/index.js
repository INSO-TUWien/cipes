'use strict';

import _ from 'lodash';
import chroma from 'chroma-js';
import emojifyReplace from 'emoji-replace';

export function endpointUrl(suffix, qs = {}) {
  const url = new URL(getBaseUrl() + suffix);
  _.each(qs, (value, key) => url.searchParams.append(key, value));

  return url;
}

export function basename(path) {
  return path.substring(path.lastIndexOf('/') + 1);
}

export function getBaseUrl() {
  return `${window.location.protocol}//${window.location.host}/api/`;
}

export function getChartColors(band, kinds) {
  const colors = chroma.scale(band).mode('lch').colors(kinds.length);

  const ret = {};
  for (let i = 0; i < kinds.length; i++) {
    ret[kinds[i]] = colors[i];
  }

  return ret;
}

export function shortenPath(path, maxLength, {replacer = '\u2026'} = {}) {
  const parts = path.split(/\//);
  const fileName = _.last(parts);

  if (fileName.length + replacer.length >= maxLength) {
    return fileName;
  }

  const dirPath = parts.slice(0, -1).join('/');
  const maxDirPathLength = maxLength - fileName.length - 1;

  const removableLength = dirPath.length - maxDirPathLength + replacer.length;

  if (removableLength <= 0) {
    return path;
  }

  const start = dirPath.length / 2 - removableLength / 2;
  const end = start + removableLength;

  return dirPath.substring(0, start) + replacer + dirPath.substring(end) + '/' + fileName;
}

export function callSafe(fn) {
  if (fn) {
    return e => fn(e);
  }
}

const brokenEmojis = {
  ':white-check-mark:': ':white_check_mark:',
  ':construction-worker:': ':construction_worker_man:'
};

export function emojify(str) {
  // replace all broken emojis with a working replacement
  _.each(brokenEmojis, (working, broken) => (str = str.split(broken).join(working)));

  return emojifyReplace(str);
}

export * from './graphQl.js';
