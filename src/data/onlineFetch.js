class onlineFecth {
  
  static async runRequest(url, abort_control) {
    try {
      const response = await fetch(url, {
        signal: abort_control.signal
      });
      if (response.status !== 200) {
        return Promise.reject(new Error(`http ${response.status}`));
      }
      const json = await response.json();
      if (abort_control.aborted) {
        return Promise.resolve(false);
      } else {
        return Promise.resolve(json);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  static searchUser(query, abort_control) {
    // No search query :no results
    if (query === '') {
      return Promise.resolve({
        total_count: 0,
        incomplete_results: false,
        items: []
      });
    } else {
      return this.runRequest(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`, abort_control);
    }
  }
  
  static getRepositories(user, abort_control) {
    return this.runRequest(user.repos_url, abort_control);
  }
  
}

export default onlineFecth;