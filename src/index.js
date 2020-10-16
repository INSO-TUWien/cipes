import {graphQl} from './util';

const page = 1, perPage = 0, until = 0;
graphQl.query(
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
).then(result => result.commits)
  .then(console.log);
