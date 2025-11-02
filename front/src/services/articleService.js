export const ArticleService = {
  url: "http://localhost:3000",
  async getAllArticles() {
    const res = await fetch(
      `${this.url}/article`,
      {credentials: 'include'}
    );
    if (!res.ok) {
      console.error('Fetch error', res.status);
      return;
    }
    return await res.json();
  },
  async getRecentArticles() {
    const res = await fetch(
      `${this.url}/article/recent`,
      {credentials: 'include'}
    );
    if (!res.ok) {
      console.error('Fetch error', res.status);
      return;
    }
    return await res.json();
  },
  async createArticle(article) {
    const res = await fetch(`${this.url}/article`, {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      console.error('Fetch error', res.status);
      return;
    }
    return await res.json();
  },
  async deleteArticle(id) {
    const res = await fetch(`${this.url}/article/?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      console.error('Fetch error', res.status);
      return;
    }
    return await res.json();
  }
}
