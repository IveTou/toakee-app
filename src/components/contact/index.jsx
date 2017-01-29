import React from 'react';
import Form from '~/src/components/form';
require('./style.scss');

const Contact = () => ( 
  <div className="Contact w3-container w3-padding-24 w3-light-grey">
    <h3 className="w3-center">CONTACT</h3>
    <p className="w3-center w3-large">Lets get in touch. Send us a message:</p>

      <div className="Container w3-row-padding">
        <div className="w3-half">
        
          <p><i className="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right"></i> Salvador, BA</p>
          <p><i className="fa fa-phone fa-fw w3-xxlarge w3-margin-right"></i> Phone: +55 71 151515</p>
          <p><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: contato@toakee.com</p>
          <br></br>
          
          <Form/>
      
        </div>
      </div>

  </div>
);

export default Contact;