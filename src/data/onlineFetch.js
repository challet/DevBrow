class onlineFecth {
  
  static async runRequest(url, signal) {
    try {
      const response = await fetch(url, {
        signal: signal
      });
      if (response.status !== 200) {
        return Promise.reject(new Error(`http ${response.status}`));
      }
      const json = await response.json();
      if (signal.aborted) {
        return Promise.resolve(false);
      } else {
        return Promise.resolve(json);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
  static searchUser(query, signal) {
    // No search query : no results
    if (query === '') {
      return new Promise( (resolve) => {
        setTimeout( () => {
          resolve({
            total_count: 0,
            incomplete_results: false,
            items: []
          });
        }, 0);
      });
    } else {
      return this.runRequest(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`, signal);
    }
  }
  
  static getRepositories(user, signal) {
    return this.runRequest(user.repos_url, signal);
  }
  
}

export default onlineFecth;