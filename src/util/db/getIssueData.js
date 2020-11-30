'use strict';

import {graphQl, traversePageWithSubPages} from '../.';

export default async function getIssueData() {
  const issueList = [];

  return await traversePageWithSubPages(getIssuesPage(), issue => {
    issueList.push(issue);
  }).then(() => issueList);
}

const getIssuesPage = () => (page, perPage, commitsPage, commitsPerPage) => {
  return graphQl.query(`
    query($page: Int, $perPage: Int, $commitsPage: Int, $commitsPerPage: Int) {
      issues(page: $page, perPage: $perPage) {
        page
        perPage
        count
        data {
          id
          iid
          title
          description
          state
          createdAt
          updatedAt
          closedAt
          closedBy {
            id
            name
            username
            state
            avatar_url
            web_url
          }
          labels
          milestone
          author {
            id
            name
            username
            state
            avatar_url
            web_url
          }
          userNotesCount
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
          commits(page: $commitsPage, perPage: $commitsPerPage) {
            page
            perPage
            count
            data {
              sha
              shortSha
            }
          }
        }
      }
    }`,
    {page, perPage, commitsPage, commitsPerPage}
  )
    .then(resp => resp.issues);
};
