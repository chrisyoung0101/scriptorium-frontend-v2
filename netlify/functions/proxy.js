const https = require('https');
const { URL } = require('url');

exports.handler = async (event) => {
  const targetURL = `https://scriptorium-api.onrender.com${event.path.replace('/api', '')}`;

  return new Promise((resolve) => {
    const url = new URL(targetURL);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: event.httpMethod,
      headers: {
        ...event.headers,
        host: url.hostname,
        'Accept-Encoding': 'identity' // Force uncompressed response
      },
      secureProtocol: 'TLSv1_2_method',
      rejectUnauthorized: false, // For debugging, set to true in prod
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body,
          headers: {
            ...res.headers,
            'access-control-allow-origin': '*', // Ensure CORS
          },
        });
      });
    });

    req.on('error', (err) => {
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
