import onlineFetch from '../../data/onlineFetch';

describe('runRequest', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  
  it('executes an http query and returns the result', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
    const abort = new AbortController();
    
    const res = onlineFetch.runRequest('https://some.where/', abort.signal)
      .then( (data) => expect(data).toEqual({ data: '12345' }) );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toEqual('https://some.where/', abort.signal);
    expect(res).toBeInstanceOf(Promise);
    return res;
  });
  
  it('returns an error when aborted during fetch', () => {
    const abort = new AbortController();
    // not really useful as the rejection will be done by following up mock
    abort.abort();
    const exception = new DOMException('The operation was aborted. ', 'AbortError');
    fetch.mockRejectOnce(exception);
    
    const res = onlineFetch.runRequest('https://some.where/', abort.signal)
      .catch( (e) => {
        expect(e).toEqual(exception);
      });
    expect(fetch).toHaveBeenCalledTimes(1);
    return res;
  });
  
  it('returns an error when aborted during json decode', () => {
    const abort = new AbortController();
    // resolve fetch and abort
    fetch.mockResponseOnce(() => { 
      abort.abort();
      return Promise.resolve({ body: JSON.stringify({ data: '12345' }) });
    });
    
    const res = onlineFetch.runRequest('https://some.where/', abort.signal)
      .catch( (e) => {
        expect(e).toBeInstanceOf(DOMException);
        expect(e.name).toBe('AbortError');
      });
    expect(fetch).toHaveBeenCalledTimes(1);
    return res;
  });
  
  it('returns an error when http status is not 200', () => {
    fetch.mockResponseOnce(null, { status: 404 });
    const abort = new AbortController();
  
    const res = onlineFetch.runRequest('https://some.where/', abort.signal)
      .catch( (e) => expect(e.message).toEqual('http 404') );
    expect(fetch).toHaveBeenCalledTimes(1);
    return res;
  });
  
});

describe('searchUser', () => {
  let orignal_runRequest;
  const runRequest_return = "runRequest_return";
  beforeAll(() => {
    orignal_runRequest = onlineFetch.runRequest;
    onlineFetch.runRequest = jest.fn().mockResolvedValue(runRequest_return);
  });
  beforeEach(() => {
    onlineFetch.runRequest.mockClear();
  });
  afterAll(() => {
    onlineFetch.runRequest = orignal_runRequest;
  });
  
  it('returns a template with no user for an empty search query', () => {
    const res = onlineFetch.searchUser('');
    expect(onlineFetch.runRequest).not.toHaveBeenCalled();
    expect(res).toBeInstanceOf(Promise);
    return res.then( (data) => { 
      expect(data).toEqual({
        total_count: 0,
        incomplete_results: false,
        items: []
      });
    });
  });
  
  it('calls runRequest when searching', () => {
    const abort = new AbortController();
    
    const res = onlineFetch.searchUser('one user', abort.signal);
    expect(onlineFetch.runRequest).toHaveBeenCalledTimes(1);
    expect(onlineFetch.runRequest.mock.calls[0][0]).toEqual("https://api.github.com/search/users?q=one%20user");
    expect(onlineFetch.runRequest.mock.calls[0][1]).toEqual(abort.signal);
    return res.then( (data) => expect(data).toEqual(runRequest_return) );
  });
});


describe('getRepositories', () => {
  let orignal_runRequest;
  const runRequest_return = "runRequest_return";
  beforeAll(() => {
    orignal_runRequest = onlineFetch.runRequest;
    onlineFetch.runRequest = jest.fn().mockResolvedValue(runRequest_return);
  });
  beforeEach(() => {
    onlineFetch.runRequest.mockClear();
  });
  afterAll(() => {
    onlineFetch.runRequest = orignal_runRequest;
  });
  
  it('calls runRequest when getting', () => {
    const abort = new AbortController();
    
    const res = onlineFetch.getRepositories({ id: 684, repos_url: "https://repos.url"}, abort.signal);
    expect(onlineFetch.runRequest).toHaveBeenCalledTimes(1);
    expect(onlineFetch.runRequest.mock.calls[0][0]).toEqual("https://repos.url");
    expect(onlineFetch.runRequest.mock.calls[0][1]).toEqual(abort.signal);
    return res.then( (data) => expect(data).toEqual(runRequest_return) );
  });
});
