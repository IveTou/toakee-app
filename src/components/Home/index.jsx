import React from 'react';
// import 'react-toolbox/commons.scss';           // Import common styles
import ToakeeAppBar from 'components/ToakeeAppBar';      // AppBar with simple overrides
import { Button } from 'react-toolbox/button'; // Bundled component import

const Home = () => (
  <div>
    <ToakeeAppBar />
    <section style={{ padding: 20 }}>
      <Button label='Primary Button' primary />
    </section>
  </div>
);

export default Home;
