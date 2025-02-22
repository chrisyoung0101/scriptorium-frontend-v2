<template>
  <div id="app">
    <h1>Scriptorium</h1>
    <DocumentForm @documentCreated="refreshDocuments" />
    <hr />
    <DocumentList ref="docList" />
  </div>
</template>

<script>
import DocumentList from './components/DocumentList.vue';
import DocumentForm from './components/DocumentForm.vue';

export default {
  name: 'App',
  components: {
    DocumentList,
    DocumentForm,
  },
  methods: {
    refreshDocuments(newDoc) {
      this.$refs.docList.fetchDocuments(); // Refresh document list
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
}
h1 {
  text-align: center;
}
</style>
