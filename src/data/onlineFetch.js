class onlineFecth {
  
  static async runRequest(url, signal) {
    try {
      const response = await fetch(url, { signal });
      if (response.status !== 200) {
        throw new Error(`http ${response.status}`);
      }
      const json = await response.json();
      if (!signal.aborted) {
        return Promise.resolve(json);
      } else {
        throw new DOMException('The operation was aborted [json].', 'AbortError');
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  static async searchUser(query, signal) {
    // No search query : no results
    if (query === '') {
      return Promise.resolve({
        total_count: 0,
        incomplete_results: false,
        items: []
      });
    } else {
      return this.runRequest(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`, signal);
    }
  }
  
  static async getRepositories(user, signal) {
    return this.runRequest(user.repos_url, signal);
  }
  
}

export default onlineFecth;