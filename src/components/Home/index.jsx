import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import TopBar from '~/src/components/TopBar';

const Home = () => (
  <div>
    <TopBar />
    <section style={{ padding: 20 }}>
      <Button label='Primary Button' primary />
    </section>
  </div>
);

export default Home;
