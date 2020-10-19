'use strict';

import {graphQl, traversePages} from '../index';
import getBounds from './getBounds';

export default async function getCommitData() {
  const {lastCommit} = await getBounds();
  const commitList = [];

  return await traversePages(getCommitsPage(lastCommit.date), commit => {
    commitList.push(commit);
  }).then(() => commitList);
}

const getCommitsPage = until => (page, perPage) => {
  return graphQl
    .query(
      `query($page: Int, $perPage: Int, $until: Timestamp) {
             commits(page: $page, perPage: $perPage, until: $until) {
               count
               page
               perPage
               data {
                 sha
                 date
                 messageHeader
                 signature
                 stats {
                   additions
                   deletions
                 }
               }
             }
          }`,
      {page, perPage, until}
    )
    .then(resp => resp.commits);
};
