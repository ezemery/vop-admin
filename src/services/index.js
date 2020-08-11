export const getUser = () => {
    return fetch(process.env.REACT_APP_API_HOST + '/api/user', {
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
        return json;
    }).catch(function(ex) {
        throw ex;
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

