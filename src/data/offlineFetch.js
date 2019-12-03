import offlineUsers from './users.json';
import offlineRepositories from './repositories.json';

class offlineFecth {
  
  static async searchUser(query) {
    try {
      if (query === '') {
        // No search query : display them all
        return Promise.resolve(offlineUsers);
      } else {
        const users = offlineUsers.items.filter((user) => user.login.indexOf(query) !== -1);
        return Promise.resolve({
          total_count: users.length,
          incomplete_results: false,
          items: users
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  static async getRepositories(user) {
    const repos = offlineRepositories.filter((repo) => repo.owner.id === user.id);
    return Promise.resolve(repos);
  }
  
}

export default offlineFecth;