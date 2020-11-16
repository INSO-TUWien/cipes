'use strict';

/**
 * The GraphQL-Schema exposed by our FOXX service
 */

const gql = require('graphql-sync');
const arangodb = require('@arangodb');
const db = arangodb.db;
const aql = arangodb.aql;
const qb = require('aqb');
const paginated = require('./types/paginated.js');
const queryHelpers = require('./query-helpers.js');
const Timestamp = require('./types/Timestamp.js');
const Sort = require('./types/Sort.js');

const commits = db._collection('commits');
const files = db._collection('files');
const stakeholders = db._collection('stakeholders');
const issues = db._collection('issues');
const builds = db._collection('builds');

const ISSUE_NUMBER_REGEX = /^#?(\d+).*$/;

const queryType = new gql.GraphQLObjectType({
  name: 'Query',
  fields() {
    return {
      commits: paginated({
        type: require('./types/commit.js'),
        args: {
          since: {type: Timestamp},
          until: {type: Timestamp},
          sort: {type: Sort}
        },
        query: (root, args, limit) => {
          let q = qb
            .for('commit')
            .in('commits')
            .sort('commit.date', args.sort);

          q = queryHelpers.addDateFilter('commit.date', 'gte', args.since, q);
          q = queryHelpers.addDateFilter('commit.date', 'lte', args.until, q);

          q = q.limit(limit.offset, limit.count).return('commit');

          return q;
        }
      }),
      commit: {
        type: require('./types/commit.js'),
        args: {
          sha: {
            description: 'sha of the commit',
            type: new gql.GraphQLNonNull(gql.GraphQLString)
          }
        },
        resolve(root, args) {
          return commits.document(args.sha);
        }
      },
      latestCommit: {
        type: require('./types/commit.js'),
        args: {
          since: {type: Timestamp},
          until: {type: Timestamp}
        },
        resolve(root, args) {
          return commits.document(args.sha);
        }
      },
      file: {
        type: require('./types/file.js'),
        args: {
          path: {
            description: 'Path of the file',
            type: new gql.GraphQLNonNull(gql.GraphQLString)
          }
        },
        resolve(root, args) {
          return files.firstExample({path: args.path});
        }
      },
      stakeholders: paginated({
        type: require('./types/stakeholder.js'),
        query: (root, args, limit) => aql`
          FOR stakeholder
            IN
            ${stakeholders}
            ${limit}
              RETURN stakeholder`
      }),
      committers: {
        type: new gql.GraphQLList(gql.GraphQLString),
        resolve: () => {
          return db
            ._query(
              aql`
              FOR commit IN ${commits}
                SORT commit.signature ASC
                RETURN DISTINCT commit.signature`
            )
            .toArray();
        }
      },
      builds: paginated({
        type: require('./types/build.js'),
        args: {},
        query: (root, args, limit) => aql`
          FOR build IN ${builds}
            SORT build.createdAt ASC
            ${limit}
            LET countsByStatus = (
              FOR other IN ${builds}
                FILTER other.finishedAt <= build.createdAt
                COLLECT status = other.status WITH COUNT INTO statusCount
                RETURN { [status]: statusCount }
            )
            RETURN MERGE(build, { stats: MERGE(countsByStatus) })`
      }),
      issues: paginated({
        type: require('./types/issue.js'),
        args: {
          q: {type: gql.GraphQLString},
          since: {type: Timestamp},
          until: {type: Timestamp},
          sort: {type: Sort}
        },
        query: (root, args, limit) => {
          let exactQuery = [];
          let fuzzyQuery = qb
            .for('issue')
            .in('issues')
            .sort('issue.createdAt', args.sort);

          if (args.q) {
            const searchString = qb.str('%' + args.q.replace(/\s+/g, '%') + '%');
            fuzzyQuery = fuzzyQuery.filter(
              qb.LIKE(
                qb.CONCAT(qb.str('#'), 'issue.iid', qb.str(' '), 'issue.title'),
                searchString,
                true
              )
            );

            const issueNumberMatch = args.q.match(ISSUE_NUMBER_REGEX);
            if (issueNumberMatch) {
              exactQuery = qb
                .for('issue')
                .in('issues')
                .filter(qb.eq('issue.iid', issueNumberMatch[1]))
                .return('issue');

              fuzzyQuery = fuzzyQuery.filter(qb.neq('issue.iid', issueNumberMatch[1]));
            }
          }

          fuzzyQuery = fuzzyQuery.return('issue');

          let q = qb
            .let('fullList', qb.APPEND(exactQuery, fuzzyQuery))
            .for('issue')
            .in('fullList');

          q = queryHelpers.addDateFilter('issue.createdAt', 'gte', args.since, q);
          q = queryHelpers.addDateFilter('issue.createdAt', 'lte', args.until, q);

          q = q.limit(limit.offset, limit.count).return('issue');

          return q;
        }
      })
    };
  }
});

module.exports = new gql.GraphQLSchema({
  query: queryType
});
