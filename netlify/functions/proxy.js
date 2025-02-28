const https = require('https');
const { URL } = require('url');

exports.handler = async (event) => {
  // Handle preflight OPTIONS request directly
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400', // Cache preflight response
      },
      body: '',
    };
  }

  // Prepend "/api" to the path when proxying.
  // This ensures that a request to /api/documents goes to https://scriptorium-api.onrender.com/api/documents.
  const targetURL = `https://scriptorium-api.onrender.com/api${event.path.replace('/api', '')}`;

  return new Promise((resolve) => {
    const url = new URL(targetURL);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: event.httpMethod,
      headers: {
        ...event.headers,
        host: url.hostname,
        'Accept-Encoding': 'identity', // Ensure uncompressed response
      },
      secureProtocol: 'TLSv1_2_method',
      rejectUnauthorized: false, // For debugging; set to true in production if possible
    };

    // Remove the Origin header to prevent CORS issues on the backend.
    delete options.headers.origin;

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        console.log('API Response:', res.statusCode, body); // Log full response for debugging

        resolve({
          statusCode: res.statusCode,
          body,
          headers: {
            ...res.headers,
            'Access-Control-Allow-Origin': '*', // Ensure CORS for frontend
          },
        });
      });
    });

    req.on('error', (err) => {
      console.error('Proxy Error:', err.message);
      resolve({
        statusCode: 500,
        body: JSON.stringify({ message: err.message }),
      });
    });

    if (event.body) {
      req.write(event.body);
    }
    req.end();
  });
};
