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

    return getFromApi(searchUrl, searchQuery)
    .then((item) => {
        

        artist = item.artists.items[0];
        //console.log(artist);
        return artist;
       
    })
    .catch(error=> {console.log(error)})
    .then((artists) => {
        id = artists.id;
        //console.log(id);
        return getFromApi(`artists/${id}/related-artists`);
    })
    .then((relatedArtists) => {
        artist.related = relatedArtists.artists;
        // console.log(artist);
        return artist;
    })
    .then((arrRelatedArtist) => {
        // console.log(arrRelatedArtist.related);
        let arrayRelatedArtist = [];
        arrRelatedArtist.related.forEach(item => {
           arrayRelatedArtist.push(getFromApi('artists/' + item.id + '/top-tracks?country=US'));
            // console.log(artist);
        });
        let allPromise = Promise.all(arrayRelatedArtist);
        return allPromise;
    })
    .then((items) => {
        console.log(items);
        // let arrPromises = [];
        items.forEach((item, index) => {
            // how do i get all the related artists
            artist.related[index].tracks =item.tracks; 
            // console.log(item);

        })
        return artist;
    })

   
};

//this is just for testing
getArtist('drake');
