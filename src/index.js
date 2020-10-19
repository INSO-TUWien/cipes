import PouchDB from 'pouchdb';
import * as pouchdb_upsert from 'pouchdb-upsert';
import getBuildData from './util/db/getBuildData';
import getCommitData from './util/db/getCommitData';
import getIssueData from './util/db/getIssueData';
import getStakeholderData from './util/db/getStakeholderData';

PouchDB.plugin(pouchdb_upsert);

const types = {
  builds: getBuildData,
  commits: getCommitData,
  issues: getIssueData,
  stakeholders: getStakeholderData
};

const db = new PouchDB('db');

Object.keys(types).forEach(type => {
  saveData(type)
    .then(() => db.get(type))
    .then(result => console.log(type, result));
});

Promise.all(Object.keys(types).map(async type => {
  const typeFn = types[type] || types['commits'];
  const data = await typeFn();
  return {type, data};
})).then(result => {
  const data = {};
  Object.keys(types).forEach(type => data[type] =
    result.find(item => item.type === type).data
  );
  return data;
})/*.then(data => fs.writeFile('db.json', JSON.stringify(data), () => {
  console.log('data successfully saved');
}))*/;

async function saveData(type = 'commits') {
  const typeFn = types[type] || types['commits'];
  const data = await typeFn();
  return db.upsert(type, doc => {
    doc[type] = data;
    return doc;
  });
}
