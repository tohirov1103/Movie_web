// https://www.omdbapi.com/?s=movieName&apikey=key -->
const key = "ce762116"
const moviesHtml = document.getElementById('movies-div')
const searchField = document.getElementById('search-field')
const searchButton = document.getElementById('search-btn')
const searchEl = document.getElementById("search-container")
const movieDetailsHtml = document.getElementById('movies-div-details')
const moviecontainer = document.getElementsByClassName('.movie-container')

var movies = []
var movieDetails = {}

const loadMovies = async (movieName)=>{
    const url = `https://www.omdbapi.com/?s=${movieName}&apikey=${key}`
    const req = await fetch(url)
    const data = await req.json()
    
    return data
} 

async function getMoveiDetails(index) {
    movieId = movies[index]['imdbID']
    const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${key}`
    console.log(url, {
        headers: {
            "Access-Control-Request-Method": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    })

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    showMovieDetails(data)
}

// show movies method
function showMovies() {
    moviesHtml.innerHTML = ''
    movies.forEach((movie, i)=>{
        const id = movie['imdbID']
        console.log(i)
        moviesHtml.innerHTML += `
        <div class='movie-item '>
            <img class="img-fluid fa-3x mb-3 mt-3" src="${movie['Poster']}" alt="Avatar" style="width:100%">
            <div class="container">
             <a href=# onclick=getMoveiDetails(${i})>${movie['Title']} • ${movie['Year']}</a>
             </div>
        </div>
        `
    })
    movieDetailsHtml.classList.add('hidden')
    
}

// setup search

function onSearch() {
    search(searchField.value)
}

function search(query) {
    loadMovies(query).then((data) => {
        console.log(data)
        movies = data['Search']
        showMovies()
   }).catch(err=>{
       console.log(err)
   })
}

// search('London')

function showMovieDetails(json) {
    movieDetails = {
        'Title': json['Title'],
        'Actors': json['Actors'],
        "Year": json["Year"],
        "Rated": json["Rated"],
        "Released": json["Released"],
        "Runtime": json["Runtime"],
        "Genre": json["Genre"],
        "Director": json["Director"],
        "Writer": json["Writer"],
        "Actors": json["Actors"],
        "Plot": json["Plot"],
        "Language": json["Language"],
        "Country": json["Country"],
        "Awards": json["Awards"],
        "Poster": json["Poster"],
        "Ratings": json["Ratings"],
        "imdbID": json["imdbID"]
    }

    movieDetailsHtml.innerHTML = `
        <div class="info"><img class="poster" src=${movieDetails['Poster']}</div>
        <h2>${movieDetails['Title']}</h2>
      <div class="details">
                    <span>${movieDetails.Rated}</span>
                    <span>${movieDetails.Year}</span>
                    <span>${movieDetails.Runtime}</span>
    </div>
    <hr>
                <div class="genre">
                <div>${movieDetails.Genre.split(",").join("</div><div>")}</div>

                </div>
                
        <li class="ploot"><h3>Plot:</h3>${movieDetails['Plot']}</li>
        <a class="homeBtn" href="index.html" >Home</a>
    `
    movieDetailsHtml.classList.remove('hidden')
    moviesHtml.classList.add('hidden')
    searchEl.classList.add('d-none')
}
