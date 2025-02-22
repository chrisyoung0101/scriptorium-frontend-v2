<template>
  <div id="app">
    <h1>Scriptorium</h1>
    <DocumentForm />
    <hr />
    <DocumentList />
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
