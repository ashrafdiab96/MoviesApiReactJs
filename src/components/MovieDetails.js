import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const MovieDetails = ({ currentLang, lang, oneMovie }) => {
    const urlParams = useParams();
    const movieId = urlParams.id;
    const imgPath = 'https://image.tmdb.org/t/p/w500/';
    const [movie, setMovie] = useState([]);

    /**
     * @method getMovie
     * @description get one movie based it's id
     * @access public
     * @returns {object}
     */
    const getMovie = async () => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=66d42eace3ba8c9e20e33bbc3ac948e7&language=${lang}`;
        const res = await axios.get(url);
        setMovie(res.data);
    };

    if (oneMovie) {
        getMovie();
    }

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>
            <Row className='justify-content-center'>
                <Col sm={12} md={12} xs={12} className='mt-4'>
                    <div className='card-detalis d-flex align-items-center'>
                        <img
                            className='img-movie w-30'
                            src={imgPath + movie.poster_path}
                            alt='movie'
                        />
                        <div className='justify-content-center text-center m-auto'>
                            <div className='card-text-details border-bottom'>
                                {currentLang.movieName}: {movie.original_title}
                            </div>
                            <div className='card-text-details border-bottom'>
                                {currentLang.movieDate}: {movie.release_date}
                            </div>
                            <div className='card-text-details border-bottom'>
                                {currentLang.movieRateCount}: {movie.vote_count}
                            </div>
                            <div className='card-text-details border-bottom'>
                                {currentLang.movieRating}: {movie.vote_average}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col sm={12} md={12} xs={12} className='mt-1'>
                    <div className='card-story d-flex flex-column align-items-start mb-3'>
                        <div className='text-end py-3 px-5'>
                            <p className='card-text-title border-bottom'>{currentLang.story}:</p>
                        </div>
                        {
                            movie.overview !== '' ? (
                                <div className='text-end px-5'>
                                    <p className='card-text-story'>{currentLang.movieStory}: {movie.overview}</p>
                                </div>
                            ) : <h2 className='text-center p-5 m-auto'>{currentLang.noData}</h2>
                        }
                    </div>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col sm={12} md={12} xs={12} className='d-flex justify-content-center mt-2'>
                    <Link to='/'>
                        <button
                            style={{ backgroundColor: '#b45b35', border: 'none' }}
                            className='btn btn-primary m-3'
                        >
                            {currentLang.backHome}
                        </button>
                    </Link>
                    {
                        movie.homepage !== '' ? (
                            <a href={movie.homepage}>
                                <button
                                    style={{ backgroundColor: '#b45b35', border: 'none' }}
                                    className='btn btn-primary m-3'
                                >
                                    {currentLang.movieShow}
                                </button>
                            </a>
                        ) : null
                    }
                </Col>
            </Row>

        </div>
    );
}

export default MovieDetails;
