<template>
    <div>
      <h2>Create New Document</h2>
      <form @submit.prevent="createDocument">
        <div>
          <label>Title:</label>
          <input v-model="document.title" required />
        </div>
  
        <div>
          <label>Author:</label>
          <input v-model="document.author" required />
        </div>
  
        <div>
          <label>Category:</label>
          <input v-model="document.category" />
        </div>
  
        <div>
          <label>Summary:</label>
          <input v-model="document.summary" />
        </div>
  
        <div>
          <label>Content:</label>
          <textarea v-model="document.content" required></textarea>
        </div>
  
        <div>
          <label>Published At:</label>
          <input type="date" v-model="document.publishedAt" />
        </div>
  
        <button type="submit">Create Document</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    name: 'DocumentForm',
    data() {
      return {
        document: {
          title: '',
          author: '',
          content: '',
          summary: '',
          category: '',
          publishedAt: '',
        },
      };
    },
    methods: {
      async createDocument() {
        try {
          // Format publishedAt to ISO 8601 format (if provided)
          const payload = { ...this.document };
          if (payload.publishedAt) {
            payload.publishedAt = `${payload.publishedAt}T00:00:00`; // Append time for LocalDateTime
          }
  
          // Send POST request to backend
          await api.post('/documents', payload);
          alert('Document created successfully!');
          this.resetForm();
        } catch (error) {
          // Enhanced error logging
          console.error('Error creating document:', error.response?.data || error);
          alert(`Failed to create document. ${error.response?.data?.message || error.message}`);
        }
      },
      resetForm() {
        this.document = {
          title: '',
          author: '',
          content: '',
          summary: '',
          category: '',
          publishedAt: '',
        };
      },
    },
  };
  </script>
  
  
  
  <style scoped>
  form div {
    margin-bottom: 10px;
  }
  input, textarea {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
  button {
    padding: 8px 16px;
  }
  </style>
  