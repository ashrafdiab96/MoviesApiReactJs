import React from "react";
import { Row } from "react-bootstrap";
import CardMovie from "./CardMovie";
import PaginationComponent from "./PaginationComponent";

const MoviesList = ({ movies, getPage, totalPages, currentLang }) => {
    return (
        <Row className="mt-3">
            {
                movies.length >= 1 ? (
                    movies.map((movie) => {
                        return (
                            <CardMovie
                                key={movie.id}
                                movie={movie}
                                currentLang={currentLang}
                            />
                        );
                    })
                ) : <h2 className="p-5 text-center">{currentLang.noData}</h2>
            }
            {
                movies.length >= 1 ? (
                    <PaginationComponent
                        getPage={getPage}
                        totalPages={totalPages}
                        currentLang={currentLang}
                    />
                ) : null
            }
        </Row>
    );
};

export default MoviesList;
