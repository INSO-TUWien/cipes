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
          <db-viewer :db="db"></db-viewer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from './Search';
import DbViewer from './DbViewer';
import json from '../db.json'

export default {
  name: 'App',
  components: {DbViewer, Search},
  data: () => ({
    db: json
  }),
  methods: {
    search: search
  }
};

function search(query) {
  console.log(query);
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
</style>
