<!-- src/components/LoginModal.vue -->
<template>
    <div class="login-modal">
      <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div>
            <label for="username">Username:</label>
            <input type="text" v-model="username" id="username" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    name: 'LoginModal',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async login() {
        try {
          // If you have an authentication API endpoint, you could call it here.
          // Example:
          // const response = await api.post('/login', { username: this.username, password: this.password });
          // localStorage.setItem('authToken', response.data.token);
  
          // For demonstration, we'll simulate a successful login if both fields are filled.
          if (this.username && this.password) {
            // Store a dummy token in localStorage
            localStorage.setItem('authToken', 'dummy-token');
            // Emit event to notify parent component that authentication succeeded
            this.$emit('authenticated');
          } else {
            this.errorMessage = 'Please enter both username and password.';
          }
        } catch (error) {
          console.error('Login error:', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .login-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .login-container form div {
    margin-bottom: 10px;
  }
  
  .login-container label {
    display: block;
    margin-bottom: 5px;
  }
  
  .login-container input {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
  
  button {
    padding: 8px 16px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  