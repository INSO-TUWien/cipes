import getCommitData from './util/db/getCommitData';
import PouchDB from 'pouchdb';
import * as pouchdb_upsert from 'pouchdb-upsert';

PouchDB.plugin(pouchdb_upsert);

const db = new PouchDB('db');

saveData()
  .then(() => db.get('commits'))
  .then(console.log);

async function saveData(type = 'commits') {
  const data = await getCommitData();
  return db.upsert(type, doc => {
    doc[type] = data;
    return doc;
  });
}
