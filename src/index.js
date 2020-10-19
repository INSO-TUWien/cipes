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
}).then(data => fs.writeFile('db.json', JSON.stringify(data), () => {
  console.log('data successfully saved');
}));
