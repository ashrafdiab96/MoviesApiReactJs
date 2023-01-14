import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardMovie = ({ movie, currentLang }) => {
    const imgPath = 'https://image.tmdb.org/t/p/w500/';

    return (
        <Col xs="6" sm="6" md="4" lg="3" className="my-1">
            <Link to={`/movie/${movie.id}`}>
                <div className="card">
                    <img src={imgPath + movie.poster_path} className="card__image" alt="hu" />
                    <div className="card__overlay">
                        <div className="overlay__text text-center w-100 p-2">
                            <p>{currentLang.movieName}: {movie.original_title}</p>
                            <p>{currentLang.movieDate}: {movie.release_date}</p>
                            <p>{currentLang.movieRateCount}: {movie.vote_count}</p>
                            <p>{currentLang.movieRating}: {movie.vote_average}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </Col>
    );
};

export default CardMovie;