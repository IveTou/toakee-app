import React from 'react';
import Form from '~/src/components/form';

require('./style.scss');

const Contact = () => (
  <div className="Contact w3-container w3-padding-24 w3-light-grey" id="contact">
    <h3 className="w3-center">CONTATO</h3>
    <p className="w3-center w3-large">
      Entre em contato. Mande-nos uma mensagem:
    </p>
    <div className="Container w3-row-padding">
      <div className="w3-third">
        <p>
          <i className="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right" />
          Salvador, BA
        </p>
        <p>
          <i className="fa fa-phone fa-fw w3-xxlarge w3-margin-right" />
          Phone: +55 71 151515
        </p>
        <p>
          <i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right" />
          Email: contato@toakee.com
        </p>
        <br />
      </div>
      <div className="w3-twothird">
        <Form />
      </div>
    </div>
  </div>
);

export default Contact;
