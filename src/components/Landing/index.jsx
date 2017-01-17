import React from 'react'
import { Button } from 'react-toolbox/lib/button';
import TopBar from '~/src/components/TopBar';

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <section style={{ padding: 20 }}>
          <Button label='Primary Button' primary />
        </section>
      </div>
    );
  }
}
