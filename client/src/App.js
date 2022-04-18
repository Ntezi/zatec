import React from 'react';
import JokesCategoryList from "./features/jokes_category/JokesCategoryList";
import SwPeopleList from "./features/sw_people/SwPeopleList";
import {Col, Container, Row} from "react-bootstrap";
import SearchResultsList from "./features/search/SearchResultsList";

function App() {
    return (
        <Container className="p-3">
            <Row>
                <Col xl={4} xs={12}>
                    <JokesCategoryList/>
                </Col>
                <Col xl={4} xs={12}>
                    <SwPeopleList/>
                </Col>
                <Col xl={4} xs={12}>
                    <SearchResultsList/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
