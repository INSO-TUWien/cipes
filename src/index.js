import getCommitData from './util/db/getCommitData';
import PouchDB from 'pouchdb';
import * as pouchdb_upsert from 'pouchdb-upsert';
import getBuildData from './util/db/getBuildData';

PouchDB.plugin(pouchdb_upsert);

const types = {
  builds: getBuildData,
  commits: getCommitData
};

const db = new PouchDB('db');

Object.keys(types).forEach(type => {
  saveData(type)
    .then(() => db.get(type))
    .then(result => console.log(type, result));
});


async function saveData(type = 'commits') {
  let typeFn = types[type] || types['commits'];
  const data = await typeFn();
  return db.upsert(type, doc => {
    doc[type] = data;
    return doc;
  });
}
