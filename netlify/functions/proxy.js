const https = require('https');
const { URL } = require('url');

exports.handler = async (event) => {
  const targetURL = `https://scriptorium-api.onrender.com${event.path.replace('/api', '')}`;
  console.log(`Proxying request to: ${targetURL}`);

  return new Promise((resolve) => {
    const url = new URL(targetURL);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: event.httpMethod,
      headers: {
        'Content-Type': event.headers['content-type'] || 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Netlify-Proxy',
        'Accept-Encoding': 'identity' // To avoid compression issues
      },
      secureProtocol: 'TLSv1_2_method',
      rejectUnauthorized: false, // For debugging; set to true in production
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        console.log(`API Response: ${res.statusCode}`);
        resolve({
          statusCode: res.statusCode,
          body,
          headers: {
            'access-control-allow-origin': '*', // Allow CORS
            'content-type': res.headers['content-type'] || 'application/json',
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

    // Forward body if present
    if (event.body) {
      req.write(event.body);
    }

    req.end();
  });
};
