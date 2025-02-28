<template>
    <div>
      <h2>Create New Document</h2>
      <form @submit.prevent="createDocument">
        <div>
          <label>Title:</label>
          <input v-model="document.title" required />
        </div>
  
        <div>
          <label>Name (optional):</label>
          <input v-model="document.name" placeholder="Auto-generated if left empty" />
        </div>
  
        <div>
          <label>Content:</label>
          <textarea v-model="document.content" required></textarea>
        </div>
  
        <div>
          <label>Type:</label>
          <select v-model="document.type">
            <option value="FILE">File</option>
            <option value="FOLDER">Folder</option>
          </select>
        </div>
  
        <div>
          <label>Parent ID (optional):</label>
          <input v-model="document.parentId" placeholder="For nested documents" />
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
          name: '',
          title: '',
          content: '',
          type: 'FILE',  // Default type
          parentId: null // For nesting under a parent
        },
      };
    },
    methods: {
      async createDocument() {
        try {
          // Generate name if empty
          const generatedName =
            this.document.name ||
            this.document.title.replace(/\s+/g, '_').toLowerCase();
  
          // Build payload as a JSON object
          const payload = {
            name: generatedName,
            title: this.document.title,
            content: this.document.content,
            type: this.document.type,
            parent: this.document.parentId ? this.document.parentId : null,
          };
  
          // POST request with JSON payload
          const response = await api.post('/documents', payload, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          alert('Document created successfully!');
          this.resetForm();
  
          // Notify parent to refresh list
          this.$emit('documentCreated', response.data);
        } catch (error) {
          console.error(
            'Error creating document:',
            error.response?.data || error
          );
          alert(
            `Failed to create document. ${
              error.response?.data?.message || error.message
            }`
          );
        }
      },
  
      resetForm() {
        this.document = {
          name: '',
          title: '',
          content: '',
          type: 'FILE',
          parentId: null,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 10px;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
  button {
    padding: 8px 16px;
  }
  </style>
  