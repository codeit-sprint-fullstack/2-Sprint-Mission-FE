const ArticleService = {
  getArticleList: async (page = 1, pageSize = 10, keyword = '') => {
    try {
      const response = await fetch(`https://sprint-mission-api.vercel.app/articles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching article list:', error.message);
    }
  },

  getArticle: async (articleId) => {
    try {
      const response = await fetch(`https://sprint-mission-api.vercel.app/articles/${articleId}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching article:', error.message);
    }
  },

  createArticle: async (title, content, image) => {
    try {
      const response = await fetch(`https://sprint-mission-api.vercel.app/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error creating article:', error.message);
    }
  },

  patchArticle: async (articleId, updates) => {
    try {
      const response = await fetch(`https://sprint-mission-api.vercel.app/articles/${articleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error patching article:', error.message);
    }
  },

  deleteArticle: async (articleId) => {
    try {
      const response = await fetch(`https://sprint-mission-api.vercel.app/articles/${articleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return true;
    } catch (error) {
      console.error('Error deleting article:', error.message);
    }
    },
  };

export default ArticleService;
