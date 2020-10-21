import {getPropertiesViaPath} from './core';

const regex = /(-?)((\w+)(\.\w+)*)(\??)([~=<>]=?)(.*)/;

export function queryDb(db, query) {
  if (typeof db !== 'object' && typeof query !== 'string') return null;
  db = JSON.parse(JSON.stringify(db)); // Object.assign?
  const keys = Object.keys(db);
  if (keys.length === 0 || query.trim().length === 0) return db;
  const queries = extractQueries(query);
  if (queries.length === 0) return db;
  queries.forEach(query => {
    const dbElement = db[query.key];
    const toRemove = [];
    dbElement.forEach((item, index) => {
      const props = getPropertiesViaPath(query.sub, item);
      const propsA = Array.isArray(props) ? props : [props];
      if (!query.not && propsA.every(p => !query.checkFn(p)) ||
        query.not && propsA.some(p => !query.checkFn(p))) {
        toRemove.push(index);
      }
    });
    toRemove.reverse().forEach(index => dbElement.splice(index, 1));
  });
  return db;
}

function extractQueries(query) {
  return query.split(' ').map(part => {
    const matches = part.match(regex);
    return matches ? {
      not: matches[1].length === 1,
      path: matches[2],
      key: matches[3],
      sub: matches[2].substring(matches[3].length + 1),
      optional: matches[5] === '?',
      comparison: matches[6],
      value: matches[7]
    } : null;
  }).filter(match => !!match)
    .map(addFunctions);

  function addFunctions(match) {
    match = Object.assign(match, {
      comparisonFn: getComparisonFunction(match.comparison, match.value)
    });
    match = Object.assign(match, {
      checkFn: getCheckFunction(match)
    });
    return match;
  }

  function getCheckFunction(match) {
    return value => {
      if ((value === null || value === undefined) && match.optional)
        return true; // !match.not
      return !!(match.not ^ match.comparisonFn(value));
    };
  }

  function getComparisonFunction(check, propValue) {
    if (check === '=') check = '==';
    else if (check === '~') check = '~=';
    return value => {
      if (typeof value === 'number' && !isNaN(propValue))
        propValue = +propValue;
      switch (check) {
        case '==':
          return value === propValue;
        case '~=':
          return value.includes(propValue);
        case '<':
          return value < propValue;
        case '<=':
          return value <= propValue;
        case '>':
          return value > propValue;
        case '>=':
          return value >= propValue;
        default:
          return String(value) === String(propValue);
      }
    };
  }
}
