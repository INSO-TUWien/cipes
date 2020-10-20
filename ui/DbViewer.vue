<template>
  <b-tabs class="dbTabs h-100">
    <b-tab title="Json">
      <label for="db" class="sr-only">Database:</label>
      <textarea id="db" disabled v-model="json" rows="5"></textarea>
    </b-tab>
  </b-tabs>
</template>

<script>
export default {
  name: 'DbViewer',
  props: ['db'],
  computed: {
    json: function () {
      return JSON.stringify(this.db, null, 2);
    }
  }
}
</script>

<style scoped>
#db {
  resize: none;
  height: 100%;
  width: 100%;
}

.dbTabs {
  display: flex;
  flex-direction: column;
}

.dbTabs >>> .tab-content {
  flex-grow: 1;
}
</style>
