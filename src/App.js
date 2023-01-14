/* packages and libraries */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

/* components */
import NavBar from "./components/NavBar";
import MoviesList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

/* languages files */
import { enLang } from "./langs/en";
import { arLang } from "./langs/ar";

const App = () => {
    /* state to save movies */
    const [movies, setMovies] = useState([]);
    /* state to save total pages */
    const [totalPages, setTotalPages] = useState();
    /* state to save current language (ar - en) */
    const [lang, setLang] = useState('ar');
    /* state to save current language file */
    const [currentLang, setCurrentLang] = useState(arLang);
    /* state to save language to pass it to index.html */
    const [htmlLang, setHtmlLang] = useState('ar');
    /* state to save direction based on language to pass it to index.html */
    const [htmlDir, setHtmlDir] = useState('rtl');
    /* state to save boolean variable to implement getMovie when url is /movie/:id */
    const [oneMovie, setOneMovie] = useState(false);

    /**
     * @method getMovies
     * @description get all movies
     * @route GET /
     * @access public
     * @returns {array[object]}
     */
    const getMovies = async () => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=66d42eace3ba8c9e20e33bbc3ac948e7&language=${lang}`;
        const res = await axios.get(url);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
    };

    /**
     * @method getPage
     * @description get all movies based on pagination
     * @access public
     * @returns {array[object]}
     */
    const getPage = async (page) => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=66d42eace3ba8c9e20e33bbc3ac948e7&language=${lang}&page=${page}`;
        const res = await axios.get(url);
        setMovies(res.data.results);
    };

    /**
     * @method searchMovies
     * @description search movies
     * @access public
     * @returns {array[object]}
     */
    const searchMovies = async (word) => {
        if (word === '') {
            getMovies();
        } else {
            let query = word.replace(/ /g, '%20');
            const url = `https://api.themoviedb.org/3/search/movie?api_key=66d42eace3ba8c9e20e33bbc3ac948e7&query=${query}&language=${lang}`;
            const res = await axios.get(url);
            setMovies(res.data.results);
            setTotalPages(res.data.total_pages);
        }
    };

    /**
     * @method changeLang
     * @description change language and some variables
     * @access public
     * @returns {void}
     */
    const changeLang = () => {
        const currentUrl = window.location.pathname;
        if (lang === 'ar') {
            setLang('en-US');
            setCurrentLang(enLang);
            setHtmlLang('en');
            setHtmlDir('ltr');
        } else {
            setLang('ar');
            setCurrentLang(arLang);
            setHtmlLang('ar');
            setHtmlDir('rtl');
        } 
        if (currentUrl === '/') {
            getMovies();
            setOneMovie(false);
        } else {
            setOneMovie(true);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);
    
    return (
        <div className="font color-body">
            <NavBar search={searchMovies} changeLang={changeLang} currentLang={currentLang} />
            <Container>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <MoviesList
                                    movies={movies}
                                    getPage={getPage}
                                    totalPages={totalPages}
                                    currentLang={currentLang}
                                />
                            }
                        />
                        <Route
                            path="/movie/:id"
                            element={
                                <MovieDetails
                                    currentLang={currentLang}
                                    lang={lang}
                                    oneMovie={oneMovie}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </Container>
            <Helmet
                htmlAttributes={{
                    lang: htmlLang,
                    dir: htmlDir,
                }}
            ></Helmet>
        </div>
    );
}

export default App;
