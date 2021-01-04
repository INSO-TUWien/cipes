<template>
  <div class="container">
    <div class="d-flex flex-column h-100 p-2">
      <div class="row mb-3">
        <div class="col">
          <search @search="search" @searchJMES="searchJMES" :jmes="jmes"></search>
        </div>
      </div>
      <div class="row flex-grow-1">
        <div class="col">
          <db-viewer v-if="!jmes" :db="queried"></db-viewer>
          <json-viewer v-else :data="queried"></json-viewer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jmespath from '@metrichor/jmespath-plus';
import Search from './Search';
import DbViewer from './DbViewer';
import json from '../db.json';
import {queryDb} from './utils/search';
import JsonViewer from './JsonViewer';

window.data = json;

export default {
  name: 'App',
  components: {JsonViewer, DbViewer, Search},
  data: () => ({
    jmes: false,
    db: json,
    queried: json
  }),
  methods: {
    search: search,
    searchJMES: searchJMES,
    updateQueried: updateQueried
  }
};

function search(query) {
  this.updateQueried(this.db);
  this.jmes = false;
  this.updateQueried(queryDb(this.db, query));
}

function searchJMES(query) {
  this.updateQueried(this.db);
  if (query === '') {
    this.jmes = false;
    return;
  }
  this.jmes = true;
  this.updateQueried(jmespath.search(this.db, query));
}

function updateQueried(data = this.db) {
  window.queried = this.queried = data;
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
</style>
