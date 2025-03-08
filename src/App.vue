<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Show Login Modal if the user is not authenticated -->
    <LoginModal v-if="!isAuthenticated" @authenticated="handleAuthenticated" />
    
    <!-- Show main content if authenticated -->
    <div v-else>
      <header>
        <h1>Scriptorium</h1>
        <!-- Logout Button -->
        <button @click="logout">Logout</button>
      </header>
      <DocumentForm @documentCreated="refreshDocuments" />
      <hr />
      <DocumentList ref="docList" />
    </div>
  </div>
</template>

<script>
import DocumentList from './components/DocumentList.vue';
import DocumentForm from './components/DocumentForm.vue';
import LoginModal from './components/LoginModal.vue';

export default {
  name: 'App',
  components: {
    DocumentList,
    DocumentForm,
    LoginModal,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    // Check for an auth token in localStorage (or any other storage you use)
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isAuthenticated = true;
    }
  },
  methods: {
    handleAuthenticated() {
      this.isAuthenticated = true;
    },
    refreshDocuments(newDoc) {
      this.$refs.docList.fetchDocuments(); // Refresh document list
    },
    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('authToken');
      // Set authentication flag to false to trigger the login modal
      this.isAuthenticated = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  text-align: center;
}
button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
