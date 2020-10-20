<template>
  <div class="container">
    <div class="d-flex flex-column h-100 p-2">
      <div class="row mb-3">
        <div class="col">
          <search @search="search"></search>
        </div>
      </div>
      <div class="row flex-grow-1">
        <div class="col">
          <db-viewer :db="queried"></db-viewer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from './Search';
import DbViewer from './DbViewer';
import json from '../db.json';
import {queryDb} from './utils/search';

export default {
  name: 'App',
  components: {DbViewer, Search},
  data: () => ({
    db: json,
    queried: json
  }),
  methods: {
    search: search
  }
};

function search(query) {
  this.queried = json;
  this.queried = queryDb(this.db, query);
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
</style>
