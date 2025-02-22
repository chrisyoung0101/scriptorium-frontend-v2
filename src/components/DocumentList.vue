<template>
    <div>
      <h1>Documents</h1>
      <ul>
        <li v-for="document in documents" :key="document.id" @click="selectDocument(document)">
          <strong>{{ document.title }}</strong> - {{ document.name }} ({{ document.type }})
        </li>
      </ul>
  
      <div v-if="selectedDocument" class="document-details">
        <h2>{{ selectedDocument.title }}</h2>
        <p><strong>Name:</strong> {{ selectedDocument.name }}</p>
        <p><strong>Type:</strong> {{ selectedDocument.type }}</p>
        <p><strong>Content:</strong></p>
        <p>{{ selectedDocument.content || 'No content available.' }}</p>
        <p v-if="selectedDocument.parentId"><strong>Parent ID:</strong> {{ selectedDocument.parentId }}</p>
        <button @click="selectedDocument = null">Back to List</button>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    name: 'DocumentList',
    data() {
      return {
        documents: [],
        selectedDocument: null,
      };
    },
    mounted() {
      this.fetchDocuments();
    },
    methods: {
      async fetchDocuments() {
        try {
          const response = await api.get('/documents');
          this.documents = response.data;
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      },
      selectDocument(document) {
        this.selectedDocument = document;
      },
    },
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    cursor: pointer;
    padding: 8px;
    border-bottom: 1px solid #ccc;
  }
  li:hover {
    background-color: #f0f0f0;
  }
  .document-details {
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }
  </style>
  