'use strict';

import {graphQl, traversePages} from '../index';

export default async function getCommitData() {
  const commitList = [];

  return await traversePages(getCommitsPage(), commit => {
    const cleanedHeader = commit.message.replace(commit.messageHeader, '');
    if (0 < cleanedHeader.trim().length)
      commit.messageBody = cleanedHeader.trim();
    commitList.push(commit);
  }).then(() => commitList);
}

const getCommitsPage = () => (page, perPage) => {
  return graphQl.query(`
    query($page: Int, $perPage: Int) {
      commits(page: $page, perPage: $perPage) {
        page
        perPage
        count
        data {
          sha
          shortSha
          signature
          date
          message
          messageHeader
          webUrl
          # files are paginated
          stakeholder {
            id
            gitSignature
            gitlabName
            gitlabAvatarUrl
            gitlabWebUrl
          }
          builds {
            id
            sha
          }
          stats {
            additions
            deletions
          }
        }
      }
    }`,
    {page, perPage}
  )
    .then(resp => resp.commits);
};
