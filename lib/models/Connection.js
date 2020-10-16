'use strict';

const _ = require('lodash');
const debug = require('debug');

_.mixin(require('lodash-inflection'));

const ctx = require('../context.js');

function Connection() {
}

Connection.define = function(FromModel, ToModel) {
  const name = `${FromModel.name}${ToModel.name}Connection`;

  const ConnectionClass = class extends Connection {
    constructor() {
      super(arguments);
    }

    static get name() {
      return name;
    }

    static ensureCollection() {
      return this.db.ensureEdgeCollection(this.collectionName);
    }

    static create(data, fromTo) {
      this.log('connect %o %o', {from: fromTo.from._id, to: fromTo.to._id}, data);
      data = data || {};
      return Promise.resolve(this.collection.save(data, fromTo.from._id, fromTo.to._id));
    }
  };

  ConnectionClass.FromModel = FromModel;
  ConnectionClass.ToModel = ToModel;
  ConnectionClass.collectionName = `${FromModel.collectionName}-${ToModel.collectionName}`;

  ctx.on('bound:db', function(db) {
    ConnectionClass.db = db;
    ConnectionClass.rawDb = db.arango;
    ConnectionClass.log = debug(`db:${name}`);
    ConnectionClass.collection = db.arango.edgeCollection(ConnectionClass.collectionName);
  });

  FromModel.connections[ToModel.name] = ConnectionClass;
  ToModel.connections[FromModel.name] = ConnectionClass;

  return ConnectionClass;
};

module.exports = Connection;
