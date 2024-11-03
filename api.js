const BASE_URL = 'https://panda-market-api.vercel.app';

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/Products`);
  return await response.json();
}

export async function getProductsByUsername(username) {
  const response = await fetch(`${BASE_URL}/products?username=${username}`);
  return await response.json();
}

export async function uploadProduct(newPost) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error('Failed to upload the post.');
  }

  return await response.json();
}

export async function getUserInfo(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  return await response.json();
}

export async function getCommentCountByproductId(productId) {
  const response = await fetch(`${BASE_URL}/Products/${productId}/comments`);
  const body = await response.json();
  return body.count;
}

export async function getCommentsByproductId(productId, page, limit) {
  const response = await fetch(
    `${BASE_URL}/Products/${productId}/comments?page=${page}&limit=${limit}`
  );
  return await response.json();
}

export async function addComment(productId, newComment) {
  const response = await fetch(`${BASE_URL}/products/${productId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error('Failed to add the comment.');
  }
  return await response.json();
}