export const getUser = () => {
    return fetch('/api/user', {
        method: 'GET',
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
    return fetch('/api/videos', {
        method: 'POST',
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

