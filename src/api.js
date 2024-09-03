const BASE_URL =`https://panda-market-api.vercel.app/docs/`

export async function getReviews({
    order = "createdAt",
    offset = 0,
    limit = 6,
  }) {
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const res = await fetch(`${BASE_URL}/film-reviews?${query}`);
    if (!res.ok) {
      throw new Error("리뷰를 불러오는데 실패했습니다");
    }
    return await res.json();
  }