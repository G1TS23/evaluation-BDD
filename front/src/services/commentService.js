export const CommentService = {
  url: 'http://localhost:3000',
  async getCommentByArticleId(articleId) {
    const res = await fetch(`${this.url}/comment?article_id=${articleId}`);
    if (!res.ok) {
      console.error('Fetch error', res.status);
      return;
    }
    return await res.json();
  },
  async deleteComment(commentId) {
    const res = await fetch(`${this.url}/comment?id=${commentId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    });
    if (!res.ok) {
      console.error('Fetch error', res.status);
      return;
    }
    return await res.json();
  },
  async addComment(articleID, content, userId) {
    const validatedComment = {
      article_id: parseInt(articleID),  // Convertir en int
      content: String(content),           // S'assurer que c'est une string
      created_at: new Date(Date.now()), // Convertir en Date
      id_user: parseInt(userId)         // Convertir en int
    };
    const res = await fetch(`${this.url}/comment?article_id=${articleID}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: validatedComment,
    })
  }
}
