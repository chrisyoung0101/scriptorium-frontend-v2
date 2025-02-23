const https = require('https');
const { URL } = require('url');

exports.handler = async (event) => {
  const targetURL = `https://scriptorium-api.onrender.com${event.path.replace('/api', '')}`;
  console.log(`🔄 Proxying request to: ${targetURL}`);

  return new Promise((resolve) => {
    const url = new URL(targetURL);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: event.httpMethod,
      headers: {
        ...event.headers,
        'host': url.hostname,
        'origin': 'https://scriptorium-v2.netlify.app', // Ensure correct origin header
      },
      timeout: 5000, // Set timeout to prevent hanging
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        console.log(`✅ API Response: ${res.statusCode}`);
        resolve({
          statusCode: res.statusCode,
          body,
          headers: {
            'Content-Type': res.headers['content-type'] || 'application/json',
            'Access-Control-Allow-Origin': '*', // Handle CORS
          },
        });
      });
    });

    req.on('error', (err) => {
      console.error(`❌ Proxy Error: ${err.message}`);
      resolve({
        statusCode: 502,
        body: JSON.stringify({ message: `Proxy error: ${err.message}` }),
      });
    });

    if (event.body) {
      req.write(event.body);
    }
    req.end();
  });
};
