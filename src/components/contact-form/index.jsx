import React from 'react';
import autoBind from 'auto-bind';
import Input from 'react-toolbox/lib/input';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      body: '',
    };
    autoBind(this);
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <Input
          className="Input"
          type="email"
          label="E-mail"
          value={this.state.email}
          onChange={value => this.handleChange('email', value)}
          required
        />
        <Input
          className="Input"
          type="tel"
          label="Telefone"
          name="phone"
          value={this.state.phone}
          onChange={value => this.handleChange('phone', value)}
        />
        <Input
          className="Input"
          type="text"
          rows={4}
          label="Mensagem"
          maxLength={400}
          value={this.state.body}
          onChange={value => this.handleChange('body', value)}
          multiline
          required
        />
        <p>
          <button className="w3-btn w3-padding" type="submit">
            ENVIAR
          </button>
        </p>
      </form>
    );
  }
}

export default ContactForm;
