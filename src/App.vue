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
        <strong>{{ document.title }}</strong> - {{ document.name }} ({{ document.type }})
      </li>
    </ul>

    <div 
      v-if="selectedDocument" 
      class="document-details magazine-style"
    >
      <div class="magazine-header">
        <!-- Random Side Image -->
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
        <!-- Render Markdown-formatted (and highlighted) content -->
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
import hljs from 'highlight.js';

// OPTIONAL: Import a highlight.js theme (example: GitHub style).
// You can choose another from https://github.com/highlightjs/highlight.js/tree/main/src/styles
import 'highlight.js/styles/github.css';

// Configure marked to use highlight.js
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    // Auto-detect language if not specified or not found
    return hljs.highlightAuto(code).value;
  },
});

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
      // Convert Markdown to HTML (with code highlighting)
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
      // Attach a random image URL to the selected document
      document.randomImageUrl = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
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

/* "Magazine style" container, but left-aligned */
.magazine-style {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left; /* Force left alignment */
}

.magazine-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.magazine-header h2 {
  margin: 0;
  font-size: 1.8em;
  font-weight: bold;
}

.magazine-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Left-align content area */
.magazine-content {
  text-align: left;
}

/* Headings in content area */
.magazine-content h1,
.magazine-content h2,
.magazine-content h3,
.magazine-content h4 {
  font-weight: bold;
  margin-top: 1em;
  color: #ffd700; /* Example highlight color */
}

/* Code block styling inherits from highlight.js theme, but you can override if you like */
code {
  font-family: 'Source Code Pro', monospace;
  background: #444;
  padding: 2px 4px;
  border-radius: 4px;
}

/* Button styling */
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
