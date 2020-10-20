<template>
  <div class="container">
    <div class="d-flex flex-column h-100 p-2">
      <template v-if="loading">
        <div class="row">
          <div class="col">
            Loading...
          </div>
        </div>
      </template>
      <template v-else>
        <div class="row mb-3">
          <div class="col">
            <search v-on:search="search"></search>
          </div>
        </div>
        <div class="row flex-grow-1">
          <div class="col">
            <db-viewer v-bind:db="db"></db-viewer>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Search from './Search';
import DbViewer from './DbViewer';

export default {
  name: 'App',
  components: {DbViewer, Search},
  data: () => ({
    loading: true,
    db: []
  }),
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: loadData,
    search: search
  }
};

function search(query) {
  console.log(query);
}

function loadData() {
  this.loading = true;
  fetch('assets/db.json')
    .then(response => response.json())
    .then(json => {
      this.db = JSON.stringify(json, undefined, 2);
      this.loading = false;
      return json;
    });
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
</style>
