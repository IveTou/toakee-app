import React from 'react';
import Input from 'react-toolbox/lib/input';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      multiline: '',
      email: '',
    };
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
        <Input className="Input" type="email" label="E-mail" value={this.state.email} required onChange={this.handleChange.bind(this, 'email')} />
        <Input className="Input" type="tel" label="Telefone" name="phone" value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} />
        <Input className="Input" type="text" multiline required rows={4} label="Mensagem" maxLength={400} value={this.state.multiline} onChange={this.handleChange.bind(this, 'multiline')} />
        <p>
          <button className="w3-btn w3-padding" type="submit">ENVIAR</button>
        </p>
      </form>
    );
  }
}

export default Form;
