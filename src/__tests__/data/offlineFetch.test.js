import offlineFetch from '../../data/offlineFetch';
import offlineUsers from '../../data/users.json';


describe('searchUser', () => {
  it('returns all the users for an empty search query', () => {
    const res = offlineFetch.searchUser('');
    expect(res).toBeInstanceOf(Promise);
    return res.then( (data) => expect(data).toEqual(offlineUsers) );
  });

  it('returns some users for a search query', () => {
    const res = offlineFetch.searchUser('rp');
    expect(res).toBeInstanceOf(Promise);
    return res.then( (data) => {
      expect(data.items).toHaveLength(1);
      expect(data.total_count).toEqual(1);
      // for this specific query, it is at the same index than in the full list
      expect(data.items[0]).toEqual(offlineUsers.items[0]);
    });
  });
});

describe('getRepositories', () => {
  it('returns repositories matching the user id', () => {
    const res = offlineFetch.getRepositories({ id: 1455447 });
    expect(res).toBeInstanceOf(Promise);
    return res.then( (data) => expect(data).toHaveLength(11));
  });

  it('returns an empty array for an unknown user id', () => {
    const res = offlineFetch.getRepositories({ id: 999 });
    expect(res).toBeInstanceOf(Promise);
    return res.then( (data) => expect(data).toHaveLength(0) );
  });
});