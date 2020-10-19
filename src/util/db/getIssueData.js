'use strict';

import {graphQl, traversePages} from '../.';

export default async function getIssueData() {
  const issueList = [];

  return traversePages(getIssuesPage(), issue => {
    issueList.push(issue);
  }).then(() => issueList);
}

const getIssuesPage = () => (page, perPage) => {
  return graphQl.query(`
    query($page: Int, $perPage: Int) {
      issues(page: $page, perPage: $perPage) {
        count
        page
        perPage
        count
        data {
          id
          iid
          title
          description
          state
          closedAt
          createdAt
          upvotes
          downvotes
          dueDate
          confidential
          weight
          webUrl
          mentions
          creator {
            id
          }
          # commits are paginated
        }
      }
    }`,
    {page, perPage}
  )
    .then(resp => resp.issues);
};
