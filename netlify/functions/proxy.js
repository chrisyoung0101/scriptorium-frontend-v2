const axios = require('axios');

exports.handler = async (event) => {
  try {
    const { path, httpMethod, body, headers } = event;
    
    const apiResponse = await axios({
      method: httpMethod,
      url: `https://scriptorium-api.onrender.com${path.replace('/api', '')}`,
      data: body,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    return {
      statusCode: apiResponse.status,
      body: JSON.stringify(apiResponse.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
