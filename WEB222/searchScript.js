// Name: Ioannis Bimpos
// Student Number: 062670146
// Section: SFF

var xml = new XMLHttpRequest();
var trailerRequest = new XMLHttpRequest();
var userInput = document.getElementById("searchBox");
var moviesList = document.getElementById("moviesList");
var searchBtn = document.getElementById("searchIdButton");
var maxPage = 10;
searchBtn.addEventListener('click', search);

window.addEventListener('load', function () {
        xml.open('GET', 'https://api.themoviedb.org/3/movie/popular?api_key=e55360add998e8078011fdbcd948ccf0&language=en-US&page=1');
        xml.send();
        xml.addEventListener('readystatechange', search);
});

function search() {
    //console.log(userInput.value);
    if (xml.readyState == 4) {
        var searchObject = JSON.parse(xml.responseText);
        var filteredInput = userInput.value.toLowerCase();

        for (var i = 0; i < searchObject.results.length; i++) {
            if (searchObject.results[i].title.toLowerCase() === filteredInput) {
                //console.log("eureka");

                var divTitle = document.createElement('div');
                divTitle.setAttribute("id", "titles"+ (i+1));
                divTitle.setAttribute("class", "titles");

                var moviePosterImg = document.createElement('img');
                moviePosterImg.setAttribute("class","posters");
                moviePosterImg.setAttribute("id","poster"+ (i+1));

                var divOverview = document.createElement('div');
                divOverview.setAttribute("id", "overview"+ (i+1));
                divOverview.setAttribute("class", "overview");

                var divReleaseDate = document.createElement('div');
                divReleaseDate.setAttribute("id", "release"+ (i+1));
                divReleaseDate.setAttribute("class", "release");

                var divRating = document.createElement('div');
                divRating.setAttribute("id", "rating"+ (i+1));
                divRating.setAttribute("class", "rating");

                var trailerVideo = document.createElement('iframe');
                trailerVideo.setAttribute("id", "trailer"+ (i+1));
                trailerVideo.setAttribute("width", "450");
                trailerVideo.setAttribute("height", "320");

                trailerRequest.open('GET', 'https://api.themoviedb.org/3/movie/' + searchObject.results[i].id + '/videos?api_key=e55360add998e8078011fdbcd948ccf0');
                trailerRequest.send();
                trailerRequest.addEventListener('readystatechange', function() {
                    if (trailerRequest.readyState == 4) {
                        //console.log(trailerRequest.results[i].key);
                        var trailerObject = JSON.parse(trailerRequest.responseText);
                        trailerVideo.setAttribute('src','https://www.youtube.com/embed/'+ trailerObject.results[0].key);
                    }
                })

                moviePosterImg.setAttribute('src', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + searchObject.results[i].poster_path);
                divTitle.innerHTML = searchObject.results[i].title+ '<br><br>';
                divOverview.innerHTML = '<strong>Overview: </strong>' + searchObject.results[i].overview+ '<br><br>';
                divReleaseDate.innerHTML = '<strong>Release Date: </strong>' + searchObject.results[i].release_date;
                divRating.innerHTML = '<strong>Review Score: </strong>' + searchObject.results[i].vote_average + '<br><br>';
                
                moviesList.appendChild(divTitle);
                moviesList.appendChild(moviePosterImg);
                moviesList.appendChild(divRating);
                moviesList.appendChild(divOverview);
                moviesList.appendChild(divReleaseDate);
                moviesList.appendChild(trailerVideo);
            }
        }
    }
}
