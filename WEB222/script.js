var xmlRequest = new XMLHttpRequest();
var trailerRequest = new XMLHttpRequest();
var moviesList = document.getElementById('moviesList');

window.addEventListener('load', function() {
	xmlRequest.open('GET', 'https://api.themoviedb.org/3/movie/now_playing?api_key=-----------------');
	xmlRequest.send();
	xmlRequest.addEventListener('readystatechange', displayLatestMovies);
});

function displayLatestMovies() {
	if (xmlRequest.readyState == 4) {
		var moviesObject = JSON.parse(xmlRequest.responseText);

		for (var i = 0; i < moviesObject.results.length; i++) {
			var individualMovieDiv = document.createElement('div');
			individualMovieDiv.setAttribute("id", "individualMovie"+ (i+1));
			individualMovieDiv.setAttribute("class", "individualMovies");
			
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
			trailerVideo.setAttribute("width", "320");
			trailerVideo.setAttribute("height", "240");

			trailerRequest.open('GET', 'https://api.themoviedb.org/3/movie/' + moviesObject.results[i].id + '/videos?api_key=e55360add998e8078011fdbcd948ccf0');
			trailerRequest.send();
			trailerRequest.addEventListener("readystatechange", function() {
				if (trailerRequest.readyState == 4) {
					//console.log(trailerRequest.results[i].key);
					var trailerObject = JSON.parse(trailerRequest.responseText);
					trailerVideo.setAttribute('src','https://www.youtube.com/embed/'+ trailerObject.results[0].key);
				}
			})

			moviePosterImg.setAttribute('src', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + moviesObject.results[i].poster_path);
			divTitle.innerHTML = moviesObject.results[i].title+ '<br><br>'; //'<strong>Title: </strong>' + 
			divOverview.innerHTML = '<strong>Overview: </strong>' + moviesObject.results[i].overview+ '<br><br>';
			divReleaseDate.innerHTML = '<strong>Release Date: </strong>' + moviesObject.results[i].release_date;
			divRating.innerHTML = '<strong>Review Score: </strong>' + moviesObject.results[i].vote_average + '<br><br>';
			
			
			individualMovieDiv.appendChild(divTitle);
			individualMovieDiv.appendChild(moviePosterImg);
			individualMovieDiv.appendChild(divRating);
			individualMovieDiv.appendChild(divOverview);
			individualMovieDiv.appendChild(divReleaseDate);
			individualMovieDiv.appendChild(trailerVideo);
			moviesList.appendChild(individualMovieDiv);
			
			moviePosterImg.addEventListener("click", movieDetails);
		}
	}



}
function movieDetails() {
	var divFront = document.getElementById("infront");
	divFront.style.display = "block";

	// window.onload = function() {
	// 	document.getElementById('close').onclick = function() {
	// 		this.style.display="none"; 
	// 		this.parentNode.style.display="none";
	// 		// divFront.style.display="none";
	// 	};
	// };

	document.addEventListener("click",function(a) {	
		if(event.target.classList.contains("posters")) {
			
			var poster = document.getElementById(event.target.id);
			var copyPoster = poster.cloneNode(true);
			var title = document.getElementById(poster.previousSibling.id);
			var copyTitle = title.cloneNode(true);
			var overview = document.getElementById(poster.nextSibling.id);
			var copyOverview = overview.cloneNode(true);
			var releaseDate = document.getElementById(overview.nextSibling.id);
			var copyReleaseDate = releaseDate.cloneNode(true);
			var rating = document.getElementById(releaseDate.nextSibling.id);
			var copyRating = rating.cloneNode(true);
			divFront.appendChild(copyTitle);
			divFront.appendChild(copyPoster);
			divFront.appendChild(copyOverview);
			divFront.appendChild(copyReleaseDate);
			divFront.appendChild(copyRating);
			
			//console.log(poster.nextSibling.id);
			//console.log(poster.previousSibling);
		}
	});

}