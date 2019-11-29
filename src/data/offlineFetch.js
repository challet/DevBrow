import offlineUsers from './users.json';
import offlineRepositories from './repositories.json';

class offlineFecth {
  
  static searchUser(query, abort_control) {
    if (abort_control.aborted) {
      return Promise.resolve(false);
    } else if (query === '') {
      // No search query : display them all (offline) or none (online)
      return Promise.resolve(offlineUsers);
    } else {
      const users = offlineUsers.items.filter((user) => user.login.indexOf(query) !== -1);
      return Promise.resolve({
        total_count: users.length,
        incomplete_results: false,
        items: users
      });
    }
  }
  
  static getRepositories(user, abort_control) {
    if (abort_control.aborted) {
      return Promise.resolve(false);
    } else {
      const repos = offlineRepositories.filter((repo) => repo.owner.id === user.id);
      return Promise.resolve(repos);
    }
  }
  
}

export default offlineFecth;