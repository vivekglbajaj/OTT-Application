import React from "react";

const MovieCard = ({ movie, onClick }) => {
    return (
        <div className='movie' onClick={onClick}>
            <img
                src={
                    movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/400"
                }
                alt={movie.Title}
            />
            <div>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </div>
        </div>
    );
};

export default MovieCard;