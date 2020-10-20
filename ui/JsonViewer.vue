<template>
  <div>
    <label for="json" class="sr-only">Database:</label>
    <textarea id="json" disabled v-model="json" rows="5"></textarea>
  </div>
</template>

<script>
export default {
  name: 'JsonViewer',
  props: {
    'data': {
      type: [String, Array, Object],
      default: ''
    }
  },
  computed: {
    json: function () {
      return typeof this.data === 'string' ? this.data :
        JSON.stringify(this.data, null, 2);
    }
  }
}
</script>

<style scoped>
#json {
  resize: none;
  height: 100%;
  width: 100%;
}
</style>
