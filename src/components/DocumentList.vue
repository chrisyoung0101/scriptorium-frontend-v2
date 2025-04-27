<!-- src/components/DocumentList.vue -->
<template>
  <div>
    <h1>Documents</h1>
    <ul>
      <li
        v-for="document in documents"
        :key="document.id"
        @click="selectDocument(document)"
      >
        <strong>{{ document.title }}</strong>
        – {{ document.name }} ({{ document.type }})
        <!-- DELETE BUTTON -->
        <button class="delete-btn" @click.stop="deleteDocument(document.id)">
          Delete
        </button>
      </li>
    </ul>

    <div v-if="selectedDocument" class="document-details magazine-style">
      <div class="magazine-header">
        <img
          :src="selectedDocument.randomImageUrl"
          alt="Random"
          class="magazine-image"
        />
        <h2>{{ selectedDocument.title }}</h2>
      </div>
      <div class="magazine-content">
        <p><strong>Name:</strong> {{ selectedDocument.name }}</p>
        <p><strong>Type:</strong> {{ selectedDocument.type }}</p>
        <p><strong>Content:</strong></p>
        <div v-html="formattedContent"></div>
        <p v-if="selectedDocument.parentId">
          <strong>Parent ID:</strong> {{ selectedDocument.parentId }}
        </p>
        <button @click="selectedDocument = null">Back to List</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';
import { marked } from 'marked';

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
  computed: {
    formattedContent() {
      if (!this.selectedDocument || !this.selectedDocument.content) {
        return '<p>No content available.</p>';
      }
      return marked(this.selectedDocument.content);
    },
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
      document.randomImageUrl =
        `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
      this.selectedDocument = document;
    },
    async deleteDocument(id) {
      try {
        await api.delete(`/documents/${id}`);
        // reload the list
        this.fetchDocuments();
        // clear detail view if it was the deleted one
        if (this.selectedDocument?.id === id) {
          this.selectedDocument = null;
        }
      } catch (error) {
        console.error('Error deleting document:', error);
        alert('Failed to delete document.');
      }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
li:hover {
  background-color: #f0f0f0;
}
.delete-btn {
  background-color: #c0392b;
  color: #fff;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: #e74c3c;
}
.document-details {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
.magazine-style {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Georgia', serif;
  line-height: 1.6;
}
.magazine-header {
  display: flex;
  align-items: center;
  gap: 20px;
}
.magazine-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
.magazine-content p {
  margin-bottom: 1em;
}
button {
  margin-top: 20px;
  background-color: #555;
  color: #fff;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: #777;
}
</style>
