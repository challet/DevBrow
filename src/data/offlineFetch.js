import offlineUsers from './users.json';
import offlineRepositories from './repositories.json';

class offlineFecth {
  
  static searchUser(query) {
    return new Promise( (resolve) => {
      setTimeout( () => {
        if (query === '') {
          // No search query : display them all
          resolve(offlineUsers);
        } else {
          const users = offlineUsers.items.filter((user) => user.login.indexOf(query) !== -1);
          resolve({
            total_count: users.length,
            incomplete_results: false,
            items: users
          });
        }
      }, 0);
    });
    
  }
  
  static getRepositories(user) {
    return new Promise( (resolve) => {
      setTimeout( () => {
        const repos = offlineRepositories.filter((repo) => repo.owner.id === user.id);
        return resolve(repos);
      }, 0);
    });
  }
  
}

export default offlineFecth;