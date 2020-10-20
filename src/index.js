import * as fs from 'fs';
import 'regenerator-runtime/runtime.js';
import getBuildData from './util/db/getBuildData';
import getCommitData from './util/db/getCommitData';
import getIssueData from './util/db/getIssueData';
import getStakeholderData from './util/db/getStakeholderData';

const types = {
  builds: getBuildData,
  commits: getCommitData,
  issues: getIssueData,
  stakeholders: getStakeholderData
};

let prodServer;
init();

export function init(server = null) {
  prodServer = server;
  loadData().then(mapData).then(saveData);
}

function loadData() {
  return Promise.all(Object.keys(types).map(async type => {
    const typeFn = types[type] || types['commits'];
    const data = await typeFn();
    return {type, data};
  }));
}

function mapData(result) {
  const data = {};
  Object.keys(types).forEach(type => data[type] =
    result.find(item => item.type === type).data
  );
  return data;
}

function saveData(data) {
  fs.writeFile('db.json', JSON.stringify(data), () => {
    console.log('data successfully saved');
    if (prodServer) {
      prodServer.kill('SIGKILL');
      process.exit();
    }
  });
}
