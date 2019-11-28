import offlineUsers from './data/users.json';
import offlineRepositories from './data/repositories.json';

class restData {
  
  static async searchUser(query, online = false) {
    // No search query : display them all (offline) or none (online)
    if (query === '') {
      return online ? {
        total_count: 0,
        incomplete_results: false,
        items: []
      } : offlineUsers;
    } 
    
    if (online) {
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
        const json = await response.json();
        return Promise.resolve(json);
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }
    } else {
      const users = offlineUsers.items.filter((user) => user.login.indexOf(query) !== -1);
      // fake api
      return Promise.resolve({
        total_count: users.length,
        incomplete_results: false,
        items: users
      });
    }
  }
  
  static async getRepositories(user, online = false) {
    if (online) {
      try {
        const response = await fetch(user.repos_url);
        const json = await response.json();
        return Promise.resolve(json);
      } catch (e) {
        console.error(e);
        return Promise.reject(e);
      }
    } else {
      const repos = offlineRepositories.filter((repo) => repo.owner.id === user.id);
      return Promise.resolve(repos);
    }
  }
  
}

export default restData;