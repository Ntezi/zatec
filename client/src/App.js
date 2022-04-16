import React from 'react';

import JokesCategoryList from "./features/jokes_category/JokesCategoryList";
import SwPeopleList from "./features/sw_people/SwPeopleList";

function App() {
  return (
      <main>
          <div className="header">
              <h1>Chuck Norris Jokes and the Star Wars People</h1>
          </div>
          <div className="row">
              <div className="col-6 col-s-12 menu">
                  <JokesCategoryList />
              </div>
              <div className="col-6 col-s-12 menu">
                  <SwPeopleList />
              </div>
          </div>
      </main>
  );
}

export default App;
