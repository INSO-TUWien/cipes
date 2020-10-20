<template>
  <div>
    <label for="db" class="sr-only">Database:</label>
    <textarea id="db" disabled v-model="json" rows="5"></textarea>
  </div>
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
textarea {
  resize: none;
  height: 100%;
  width: 100%;
}
</style>
