import React from 'react';

import Welcome from 'components/Welcome/';
import TestCards from 'components/TestCards/';



//if (process.env.BROWSER) {
  require('./style.scss');
//}

/*
*Components must return a single root element. This is why we added a <div> to contain all the <Welcome /> elements.
*/
const Home = () =>
	 
	<div className="Home">
      <h1>Hello, worlds!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
      <div>
      	<Welcome name="Sara" />
      	<Welcome name="Cahal" />
      	<Welcome name="Edite" />
      </div>
      <div>
      	<TestCards />
      </div>
    </div>;

export default Home;
