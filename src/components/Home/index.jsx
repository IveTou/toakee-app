import React from 'react';
//import 'react-toolbox/commons.scss';// Import common styles
import TopBar from 'components/TopBar';
import { Button } from 'react-toolbox/button';

const Home = () => (
  <div>
    <TopBar />
    <section style={{ padding: 20 }}>
      <Button label='Primary Button' primary />
    </section>
  </div>
);

export default Home;
