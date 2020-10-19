'use strict';

import {graphQl, traversePages} from '../.';

export default async function getBuildData() {
  const buildList = [];

  return traversePages(getBuildsPage, build => {
    buildList.push(Object.assign({}, build, {
      _stats: {
        total:
          (build.stats.success || 0) +
          (build.stats.failed || 0) +
          (build.stats.pending || 0) +
          (build.stats.canceled || 0)
      }
    }));
  }).then(() => buildList);
}

const getBuildsPage = (page, perPage) => {
  return graphQl.query(`
    query($page: Int, $perPage: Int) {
      builds(page: $page, perPage: $perPage) {
        count
        page
        perPage
        count
        data {
          id
          sha
          beforeSha
          ref
          status
          createdAt
          updatedAt
          startedAt
          finishedAt
          committedAt
          duration
          coverage
          webUrl
          jobs {
            id
            name
            status
            stage
            webUrl
            createdAt
            finishedAt
          }
          commit {
            sha
            message
            messageHeader
          }
          stats {
            success
            failed
            pending
            canceled
          }
        }
      }
    }`,
    {page, perPage}
  )
    .then(resp => resp.builds);
};
