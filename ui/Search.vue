<template>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <div class="input-group">
          <label for="search" class="sr-only">Search:</label>
          <input type="text" id="search" class="form-control"
                 autocomplete="off" v-model="searchText"
                 @keypress.enter="$emit(getSearchType($event), searchText, $event)">

          <div class="input-group-append">
            <button type="button" class="btn btn-outline-primary" title="Search"
                    @click="$emit('search', searchText, $event)">
              <font-awesome-icon icon="search"/>
            </button>
            <button type="button" class="btn btn-outline-primary" title="JMES Path"
                    @click="$emit('searchJMES', searchText, $event)">
              <font-awesome-icon :icon="['fab','searchengin']"/>
            </button>
          </div>
        </div>

        <small class="form-text text-muted">
          <template v-if="!jmes || searchText===''">
            Query pattern: <code>-?\w+(\.\w+)*\??[~=&lt;&gt;]=?.*</code>
          </template>
          <template v-if="searchText===''">
            &bullet;
          </template>
          <template v-if="jmes || searchText===''">
            <a href="https://jmespath.org/specification.html" target="_blank">JMES Path Specification</a>
            |
            <a href="https://github.com/nanoporetech/jmespath-plus" target="_blank">JMES Path Plus</a>
          </template>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    'jmes': {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getSearchType: getSearchType
  },
  data: () => ({
    searchText: ''
  })
}

function getSearchType(event) {
  if (event.shiftKey) return this.jmes ? 'search' : 'searchJMES';
  return this.jmes ? 'searchJMES' : 'search';
}
</script>
