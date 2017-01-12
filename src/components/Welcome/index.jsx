import React from 'react';

//if (process.env.BROWSER) {
  require('./style.scss');
//}

const Welcome = (props) =>
  <div className="Welcome"> <h1>Welcome, {props.name}</h1></div>;


export default Welcome;