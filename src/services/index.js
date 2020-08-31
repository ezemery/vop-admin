export const getUsers = () => {
    return fetch(process.env.REACT_APP_API_HOST + '/admin/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    }).then(function(json) {
        return [...json];
    }).catch(function(ex) {
        throw ex;
    });
}

export const findUserInUsersById = (users, id) => {
    return users.find(element => element.id.toString() === id);
}

export const getVideos = (lastVideo, status, hasTags, query, userId, accountId) => {
    const params = {
        max_id: lastVideo,
        status: status,
        has_tags: hasTags,
        query: query,
    };

    const esc = encodeURIComponent;
    const queryString = Object.keys(params)
        .filter(k => params[k] !== "")
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return fetch(process.env.REACT_APP_API_HOST + '/admin/user/id/'+userId+'/account/id/'+accountId+'/content?'+queryString, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
      }).then(function(json) {
        return json
      }).catch(function(ex) {
        throw ex;
      })
}

