'use strict';

import {graphQl, traversePages} from '../.';
import getBounds from './getBounds';

export default async function getIssueData() {
  const {lastIssue} = await getBounds();
  if (!lastIssue) return [];
  const issueList = [];

  return traversePages(getIssuesPage(lastIssue.createdAt), issue => {
    issueList.push(issue);
  }).then(() => issueList);
}

const getIssuesPage = until => (page, perPage) => {
  return graphQl
    .query(
      `
    query($page: Int, $perPage: Int, $until: Timestamp) {
      issues(page: $page, perPage: $perPage, until: $until) {
        count
        page
        perPage
        count
        data {
          title
          createdAt
          closedAt
        }
      }
    }`,
      {page, perPage, until}
    )
    .then(resp => resp.issues);
};
