import getCommitData from './util/db/getCommitData';
import PouchDB from 'pouchdb';

const db = new PouchDB('db');

saveData()
  .then(() => db.get('commits'))
  .then(console.log);

async function saveData(type = 'commits') {
  const data = await getCommitData();
  try {
    const doc = await db.get(type);
    return await db.put({
      _id: type,
      _ref: doc._ref,
      [type]: data
    });
  } catch (err) {
    if (err.status !== 404) return err;
    return await db.put({
      _id: type,
      [type]: data
    });
  }
}
