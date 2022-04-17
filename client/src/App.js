import React from 'react';

import JokesCategoryList from "./features/jokes_category/JokesCategoryList";
import SwPeopleList from "./features/sw_people/SwPeopleList";
import {Container, Navbar} from "react-bootstrap";

function App() {
  return (
      <main className="container">
          <Navbar bg="primary" variant="dark" expand="lg">
              <Container>
                  <Navbar.Brand href="#home">Chuck Norris Jokes and the Star Wars People</Navbar.Brand>
              </Container>
          </Navbar>
          <div className="row">
              <div className="col-7 col-s-12">
                  <JokesCategoryList />
              </div>
              <div className="col-5 col-s-12">
                  <SwPeopleList />
              </div>
          </div>
      </main>
  );
}

export default App;
