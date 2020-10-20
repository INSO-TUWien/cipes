<template>
  <div class="container p-2">
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
          <search></search>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="db" class="sr-only">Database:</label>
          <textarea id="db" disabled v-model="db" rows="5"></textarea>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Search from './Search';

export default {
  name: 'App',
  components: {Search},
  data: () => ({
    loading: true,
    db: []
  }),
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: loadData
  }
};

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

textarea#db {
  resize: none;
  height: 100%;
  width: 100%;
}
</style>
