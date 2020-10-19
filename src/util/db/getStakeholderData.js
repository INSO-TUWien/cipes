'use strict';

import {graphQl, traversePages} from '../.';

export default async function getStakeholderData() {
  const stakeholderList = [];

  return traversePages(getStakeholdersPage(), stakeholder => {
    stakeholderList.push(stakeholder);
  }).then(() => stakeholderList);
}

const getStakeholdersPage = () => (page, perPage) => {
  return graphQl.query(`
    query($page: Int, $perPage: Int) {
      stakeholders(page: $page, perPage: $perPage) {
        count
        page
        perPage
        count
        data {
          id
          gitSignature
          gitlabName
          gitlabAvatarUrl
          gitlabWebUrl
        }
      }
    }`,
    {page, perPage}
  )
    .then(resp => resp.stakeholders);
};
