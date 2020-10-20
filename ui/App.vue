<template>
  <div>
    <template v-if="loading">
      Loading...
    </template>
    <template v-else>
      <pre><code>{{ db }}</code></pre>
    </template>
  </div>
</template>

<script>
export default {
  name: 'App',
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
