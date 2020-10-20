<template>
  <div class="row">
    <div class="col">
      <div class="input-group">
        <label for="search" class="sr-only">Search:</label>
        <input type="text" id="search" class="form-control"
               autocomplete="off" v-model="searchText"
               @keypress.enter="$emit('search',searchText, $event)">

        <div class="input-group-append">
          <button type="button" class="btn btn-outline-primary"
                  @click="$emit('search', searchText, $event)">
            <font-awesome-icon icon="search"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: () => ({
    searchText: ''
  })
}
</script>
