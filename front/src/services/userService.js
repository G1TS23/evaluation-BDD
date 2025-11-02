export const UserService = {
  url: "http://localhost:3000",
  async getAllUsers() {
    const res = await fetch(
      `${this.url}/user`,
      {credentials: 'include'}
    );
    if (!res.ok) {
      console.error('Fetch error', res.status);
      return;
    }
    return await res.json();
  },

  async createUser(user) {
    const res = await fetch(`${this.url}/user`, {
      method: 'POST',
      body: JSON.stringify(user),
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
