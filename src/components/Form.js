import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Recaptcha from "react-google-invisible-recaptcha";
import api from "../services/api";

export class Form extends Component {
  state = {
   token : "",
    messageSent: false,
  };



  sendMessage = () => {
    this.recaptcha.execute().then(value => {
        this.setState({token: value});
    this.sendTokenBack();   
        
    });
    
  };

 async sendTokenBack() {
   await api.post('token', {
          token: this.state.token 
       })
         .then((response) => {
             if(response.data === 200){
               console.log(response.data);
             }})

         .catch((error) => {
            alert('Erro ao enviar token. ', error);
         });
  }

  onResolved = () => {
    this.setState({ messageSent: true });
    // Process Data //
  
  };

  render() {
    let confirmation = this.state.messageSent ? (
      <div>
        Token enviado:
        <br /> <br />
        {this.state.token}
      </div>
    ) : null;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Recaptcha V3 Demo" />
          {confirmation}
        
          <br />
         
          <br />
          <RaisedButton
            label="Enviar token"
            style={StyleSheet.button}
            onClick={this.sendMessage}
          />
          <Recaptcha
            ref={(ref) => (this.recaptcha = ref)}
            sitekey="6Lc9ZLIZAAAAAJUKhKsO1B0K62l41V45bGbkYMg5"
            onResolved={this.onResolved}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Form;
