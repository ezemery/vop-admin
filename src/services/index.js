export const getUser = () => {
    return fetch(process.env.REACT_APP_API_HOST + '/api/user', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        return response.json()
    }).then(function(json) {
        return json;
    }).catch(function(ex) {
        return ex;
    });
}

export const getVideos = (lastVideo, status, hasTags, query) => {
    return fetch(process.env.REACT_APP_API_HOST + '/api/videos', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          max_id: lastVideo,
          status: status,
          has_tags: hasTags,
          query: query,
        })
      }).then(function(response) {
        return response.json()
      }).then(function(json) {
        return json
      }).catch(function(ex) {
        return ex;
      })
}

