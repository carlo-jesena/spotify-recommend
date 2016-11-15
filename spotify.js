var getFromApi = function(endpoint, query) {
    var url = 'https://api.spotify.com/v1/' + endpoint;

    var queryString = Qs.stringify(query);
    if (queryString) {
        url += '?' + queryString;
    };

    return fetch(url).then(function(response) {
        if (response.status < 200 || response.status >= 300) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    });
};


var artist;
var getArtist = function(name) {
    let searchUrl = 'search';
    let searchQuery = {
        q: name,
        limit: 1,
        type: 'artist'
    }
    getFromApi(searchUrl, searchQuery)
    .then((item) => {
        console.log(item);
        artist = item.artists.items[0];
        console.log(artist);
        return artist;
    })
    

   
};

//this is just for testing
getArtist('drake');