'use strict';

import Promise from 'bluebird';
import _ from 'lodash';
import {Lokka} from 'lokka';
import {Transport} from 'lokka-transport-http';

const apiPath = 'http://localhost:48763';
const graphQl = new Lokka({transport: new Transport(apiPath + '/graphQl')});

export {graphQl};

const isNewPageRequired = page => page.data.length + (page.page - 1) * page.perPage < page.count;

export function traversePages(getPage, fn, pageNumber = 1, perPage = 1000) {
  const args = [];
  if (0 < getPage.length - 2)
    for (let i = 0; i < getPage.length - 2; i++)
      args[i] = i % 2 === 0 ? 1 : 1;
  return Promise.resolve(getPage(pageNumber, perPage, ...args)).then(page => {
    _.each(page.data, d => fn.call(null, d, page));
    if (isNewPageRequired(page)) {
      return traversePages(getPage, fn, pageNumber + 1, perPage);
    }
  });
}

export function traversePageWithSubPages(getPage, fn) {
  const list = [];
  return traversePages(getPage, (a, b) => {
    a._page = b;
    list.push(a);
  }).then(() => getUniquePagesWhichNeedUpdateFromList(list).map(page => traverseSubPages(getPage, page)))
    .then(promises => promises.length > 0 ? Promise.all(promises) : Promise.resolve(null))
    .then(resolveRecursivePromise)
    .then(data => {
      if (data)
        data.forEach(dataItem => dataItem.list.forEach(item => {
          const found = list.find(i => i.sha === item.sha);
          if (!found || !found[dataItem.page.key]) return;
          found[dataItem.page.key].data.unshift(...item[dataItem.page.key].data);
        }));
      const keys = getKeyAttributes(list);
      _.each(list.map(item => {
        delete item._page;
        keys.forEach(key => item[key] = item[key] && item[key].data ? item[key].data : item[key]);
        return item;
      }), fn);
    });


  function traverseSubPages(getPage, page, data = []) {
    return Promise.resolve(getPage(page.rootPage.page, page.rootPage.perPage,
      page.page.page + 1, page.page.perPage)).then(rootPage => {
      data.push({page, list: rootPage.data});
      const uniquePages = getUniquePagesWhichNeedUpdateFromList(rootPage.data, page.rootPage);
      if (uniquePages.length === 0) return Promise.resolve(data);
      return uniquePages.map(page => traverseSubPages(getPage, page, data));
    });
  }

  function getUniquePagesWhichNeedUpdateFromList(list, rootPage) {
    const keys = getKeyAttributes(list).filter(item => !item.startsWith('_'));
    return list.flatMap(item => keys.map(key => {
      const page = item[key];
      const newPageRequired = isNewPageRequired(page);
      return {key, item, page: item[key], newPageRequired, rootPage: item._page || rootPage};
    })).filter(item => item.newPageRequired)
      .filter((item, index, self) =>
        index === self.findIndex(p => item.rootPage.page === p.rootPage.page)
      );
  }

  function resolveRecursivePromise(promise) {
    if (Array.isArray(promise) && 0 < promise.length && Array.isArray(promise[0]))
      promise = promise.flatMap(i => i);
    return Array.isArray(promise) && promise.some(p => Promise.is(p)) ?
      resolveRecursivePromise(Promise.all(promise)) :
      Promise.is(promise) ? promise.then(resolveRecursivePromise) : promise;
  }
}

export function collectPages(getPage, fn, pageNumber = 1, perPage = 1000) {
  const items = [];
  return traversePages(getPage, item => items.push(item), pageNumber, perPage).thenReturn(items);
}

function getKeyAttributes(list) {
  const firstDataEntry = 0 < list.length ? list[0] : {};
  return Object.keys(firstDataEntry).filter(key => {
    const attribute = firstDataEntry[key];
    return attribute.page !== undefined &&
      attribute.count !== undefined &&
      attribute.perPage !== undefined;
  });
}
