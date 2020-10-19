'use strict';

import {graphQl, traversePageWithSubPages} from '../.';

export default async function getCommitData() {
  const commitList = [];

  return await traversePageWithSubPages(getCommitsPage(), commit => {
    const cleanedHeader = commit.message.replace(commit.messageHeader, '');
    if (0 < cleanedHeader.trim().length)
      commit.messageBody = cleanedHeader.trim();
    commitList.push(commit);
  }).then(() => commitList);
}

const getCommitsPage = () => (page, perPage, filesPage, filesPerPage) => {
  return graphQl.query(`
    query($page: Int, $perPage: Int, $filesPage: Int, $filesPerPage: Int) {
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
          files(page: $filesPage, perPage: $filesPerPage) {
            page
            perPage
            count
            data {
              # id
              file {
                id
                path
              }
              lineCount
              hunks {
                newStart
                newLines
                oldStart
                oldLines
              }
            }
          }
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
    {page, perPage, filesPage, filesPerPage}
  )
    .then(resp => resp.commits);
};
