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
          name: '',         // Add this field
          title: '',
          content: '',
          type: 'FILE',     // Default to FILE, could also be FOLDER
          parent: null      // For root-level documents
        },
      };
    },
    methods: {
      async createDocument() {
        try {
          // Prepare payload
          const payload = {
            name: this.document.name || this.document.title.replace(/\s+/g, '_').toLowerCase(), // Auto-generate name if empty
            title: this.document.title,
            content: this.document.content,
            type: this.document.type,
            parent: this.document.parent
          };
  
          // Send POST request
          const response = await api.post('/documents', payload);
          alert('Document created successfully!');
  
          // Clear form
          this.resetForm();
  
          // Optionally, emit event to refresh document list
          this.$emit('documentCreated', response.data);
        } catch (error) {
          console.error('Error creating document:', error.response?.data || error);
          alert(`Failed to create document. ${error.response?.data?.message || error.message}`);
        }
      },
      resetForm() {
        this.document = {
          name: '',
          title: '',
          content: '',
          type: 'FILE',
          parent: null
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
  