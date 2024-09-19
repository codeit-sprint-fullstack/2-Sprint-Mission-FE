const axios = require("axios");

const instance = axios.create({
  baseURL: "https://pandamarket-zyyr.onrender.com/products"
});

function validatePositiveInteger(data) {
  return Number.isInteger(data) && data > 0;
}

function isValid(value) {
  return value === undefined || value === "" || value === null;
}

exports.handler = async (event) => {
  const { httpMethod, body, queryStringParameters } = event;

  if (httpMethod === "GET") {
    const {
      page = 1,
      pageSize = 10,
      keyword = "",
      orderBy = "recent"
    } = queryStringParameters;

    if (!validatePositiveInteger(Number(page))) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "page는 양의 정수여야 합니다." })
      };
    }
    if (!validatePositiveInteger(Number(pageSize))) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "pageSize는 양의 정수여야 합니다." })
      };
    }

    try {
      const res = await instance.get("", {
        params: { page, pageSize, keyword, orderBy }
      });
      return { statusCode: 200, body: JSON.stringify(res.data) };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }
  }

  if (httpMethod === "POST") {
    const params = JSON.parse(body);
    const price = Number(params.price);

    if (!validatePositiveInteger(price)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "가격은 양의 정수여야 합니다." })
      };
    }

    const { name, description, tags } = params;
    const testParams = { name, description, price, tags };

    for (let option in testParams) {
      if (isValid(testParams[option])) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `${option}은 필수 기입사항입니다.` })
        };
      }
    }

    try {
      const res = await instance.post("", params);
      return { statusCode: 201, body: JSON.stringify(res.data) };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method Not Allowed" })
  };
};
