import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const NavBar = ({ search, changeLang, currentLang }) => {
    /**
     * @method onSearch
     * @description handle search movies
     * @access public
     * @returns {array[object]}
     */
    const onSearch = (word) => {
        search(word);
    };

    return (
        <div className="nav-style w-100">
            <Container>
                <Row className="pt-2 ">
                    <Col xs="2" lg="1">
                        <a href="/">
                            <img className="logo" src={'/imgs/logo.png'} alt="dfs" />
                        </a>
                    </Col>
                    <Col xs="8" lg="10" className=" d-flex align-items-center">
                        <div className="search  w-100">
                            <i className="fa fa-search"></i>
                            <input
                                onChange={ e => onSearch(e.target.value) }
                                type="text"
                                className="form-control"
                                placeholder={currentLang.search}
                            />
                        </div>
                    </Col>
                    <Col xs="2" lg="1" className="d-flex justify-content-center align-items-center">
                        <button
                            onClick={changeLang}
                            className="btn btn-sm btn-warning text-white"
                        >
                            {currentLang.wantedLang}
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NavBar;