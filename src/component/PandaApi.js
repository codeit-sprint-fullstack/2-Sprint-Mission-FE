const BASE_URL = `https://productdb-pipv.onrender.com`;

export async function getItemList({
  sort = "recent",
  limit = 10,
  page = 1,
} = {}) {
  const query = `sort=${sort}&page=${page}&limit=${limit}`;
  const res = await fetch(`${BASE_URL}/items?${query}`);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
}

export async function createItemList(formData) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return await res.json();
}
