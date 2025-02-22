import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// Sample default movies
const defaultMovies = [
  {
      Title: "Inception",
      Year: "2010",
      imdbID: "tt1375666",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  
  {
      Title: "Interstellar",
      Year: "2014",
      imdbID: "tt0816692",
      Poster: "https://m.media-amazon.com/images/M/MV5BZDU5NTJkMjQtNGYyZC00NjYwLWJlNWMtODk5NDI5MDE3NDJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
       Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
      Title: "The Dark Knight",
      Year: "2008",
      imdbID: "tt0468569",
      Poster: "https://images.moviesanywhere.com/bd47f9b7d090170d79b3085804075d41/c6140695-a35f-46e2-adb7-45ed829fc0c0.jpg",
       Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
      Title: "Iron Man",
      Year: "2008",
      imdbID: "tt0468562323",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg",
       Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
      Title: "Parasite",
      Year: "2008",
      imdbID: "tt0468569121",
      Poster: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg",
       Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
      Title: "The Conjuring",
      Year: "2008",
      imdbID: "tt0468569455",
      Poster: "https://m.media-amazon.com/images/M/MV5BOTRkMDlmZWEtMzQyYy00YzgyLTgwM2QtNzgxYmIwNGVlYmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
       Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
      Title: "End-Game",
      Year: "2019",
      imdbID: "tt04685695666",
      Poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
       Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
      Title: "KGF",
      Year: "2021",
      imdbID: "tt04685696777",
      Poster: "https://m.media-amazon.com/images/M/MV5BM2M0YmIxNzItOWI4My00MmQzLWE0NGYtZTM3NjllNjIwZjc5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  },
  {
      Title: "Three idiots",
      Year: "2021",
      imdbID: "tt046856909876",
      Poster: "https://m.media-amazon.com/images/M/MV5BNzc4ZWQ3NmYtODE0Ny00YTQ4LTlkZWItNTBkMGQ0MmUwMmJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
       Trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
];

const API_URL = "https://www.omdbapi.com/?apikey=5baa7886";


const App = () => {
  const [movies, setMovies] = useState(defaultMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
      if (searchTerm) {
          searchMovies(searchTerm);
      } else {
          setMovies(defaultMovies);
      }
  }, [searchTerm]);

  useEffect(() => {
      // Auto-slide every 5 seconds
      const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % movies.length);
      }, 5000);
      return () => clearInterval(interval);
  }, [movies.length]);

  const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Search) {
          setMovies(data.Search);
      } else {
          setMovies([]);
      }
  };

  const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
          searchMovies(searchTerm);
      }
  };

  const handleMovieClick = (movie) => {
      setSelectedMovie(movie);
  };

  const handleSlideChange = (index) => {
      setCurrentSlide(index);
  };

  return (
      <div className='app'>
          {/* Header with Hotstar Title */}
          <header>
              <h1>Disney+ Hotstar</h1>
          </header>

          {/* Main Content */}
          <div className="main-content">
              {/* Navbar on the Left */}
              <nav>
                  <ul>
                      <li><a href="#">Home</a></li>
                      <li><a href="#">Movies</a></li>
                      <li><a href="#">TV Shows</a></li>
                      <li><a href="#">Sports</a></li>
                  </ul>
              </nav>

              {/* Movie Display Section on the Right */}
              <div className="movie-section">
                  {/* Hero Section with Slide Container */}
                  <div className="hero-section">
                      <div className="slide-container">
                          {movies.map((movie, index) => (
                              <div
                                  key={movie.imdbID}
                                  className={`slide ${index === currentSlide ? "active" : ""}`}
                                  style={{ backgroundImage: `url(${movie.Poster})` }}
                              >
                                  <div className="slide-content">
                                      <h2>{movie.Title}</h2>
                                      <p>{movie.Year}</p>
                                      <button onClick={() => handleMovieClick(movie)}>Play</button>
                                  </div>
                              </div>
                          ))}
                      </div>
                      <div className="slide-indicators">
                          {movies.map((_, index) => (
                              <span
                                  key={index}
                                  className={`indicator ${index === currentSlide ? "active" : ""}`}
                                  onClick={() => handleSlideChange(index)}
                              ></span>
                          ))}
                      </div>
                  </div>

                  {/* Search Bar */}
                  <div className='search'>
                      <input
                          placeholder='Search for a movie'
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={handleKeyDown}
                      />
                      <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)} />
                  </div>

                  {/* Video Player */}
                  {selectedMovie ? (
                      <div className="video-player">
                          <iframe

    width="100%"
    height="500"
    src="https://www.youtube.com/embed/YoHD9XEInc0"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
></iframe>
                          <button onClick={() => setSelectedMovie(null)}>Close</button>
                      </div>
                  ) : (
                      <>
                          {/* Movie List */}
                          {movies.length > 0 ? (
                              <div className='movie-grid'>
                                  {movies.map((movie) => (
                                      <MovieCard
                                          movie={movie}
                                          key={movie.imdbID}
                                          onClick={() => handleMovieClick(movie)}
                                      />
                                  ))}
                              </div>
                          ) : (
                              <div className="empty">
                                  <h2>No movies found</h2>
                              </div>
                          )}
                      </>
                  )}
              </div>
          </div>

          {/* Footer */}
          <footer>
              <p>&copy; 2023 Disney+ Hotstar. All rights reserved.</p>
          </footer>
      </div>
  );
};

export default App;