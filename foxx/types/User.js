'use strict';

const gql = require('graphql-sync');

module.exports = new gql.GraphQLObjectType({
  name: 'User',
  fields() {
    return {
      id: {
        type: new gql.GraphQLNonNull(gql.GraphQLInt)
      },
      name: {
        type: gql.GraphQLString
      },
      username: {
        type: gql.GraphQLString
      },
      state: {
        type: gql.GraphQLString
      },
      avatar_url: {
        type: gql.GraphQLString
      },
      web_url: {
        type: gql.GraphQLString
      }
    };
  }
});
