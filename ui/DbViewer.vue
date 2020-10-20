<template>
  <b-tabs class="dbTabs h-100" :justified="true">
    <b-tab title="ALL">
      <json-viewer :data="json"></json-viewer>
    </b-tab>
    <b-tab v-for="key in keys" :title="key" :key="key"
           :disabled="!db[key] || db[key].length===0">
      <json-viewer :data="db[key]"></json-viewer>
    </b-tab>
  </b-tabs>
</template>

<script>
import JsonViewer from './JsonViewer';

export default {
  name: 'DbViewer',
  components: {JsonViewer},
  props: {
    'db': {
      type: Object,
      default: {}
    }
  },
  computed: {
    json: function () {
      return JSON.stringify(this.db, null, 2);
    },
    keys: function () {
      return Object.keys(this.db);
    }
  }
}
</script>

<style scoped>
.dbTabs {
  display: flex;
  flex-direction: column;
}

.dbTabs >>> .tab-content {
  flex-grow: 1;
}
</style>
