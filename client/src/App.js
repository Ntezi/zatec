import React from 'react';

import JokesCategoryList from "./features/jokes_category/JokesCategoryList";
import SwPeopleList from "./features/sw_people/SwPeopleList";
import {Col, Container, Row} from "react-bootstrap";

function App() {
  return (
      <Container className="p-3">
          <Row>
              <Col xl={7} xs={12}>
                  <JokesCategoryList />
              </Col>
              <Col xl={5} xs={12}>
                  <SwPeopleList />
              </Col>
          </Row>
      </Container>
  );
}

export default App;
