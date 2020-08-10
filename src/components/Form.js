import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Recaptcha from "react-google-invisible-recaptcha";
import RecaptchaV2 from "react-google-recaptcha";
import api from "../services/api";

export class Form extends Component {
  state = {
    token: "",
    visible : true
  };

  

  sendMessage = () => {
    this.recaptcha.execute().then((value) => {
      this.setState({ token: value });
      this.sendTokenBack();
    });
  };

  async sendTokenBack() {
    await api
      .post("token", {
        token: this.state.token,
      })
      .then((response) => {
        console.log(this.state.token);
        alert("Enviado");
        
      })

      .catch((error) => {
        this.setState({ visible: false });
        alert("Erro ao enviar token");
      });
  }

 
  render() {

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Recaptcha Demo" />

          <br />
          <br />

          <RaisedButton
            label="Enviar token"
            style={StyleSheet.button}
            onClick={this.sendMessage}
          />
          {this.state.visible && (
            <Recaptcha
              ref={(ref) => (this.recaptcha = ref)}
              sitekey="6Lc9ZLIZAAAAAJUKhKsO1B0K62l41V45bGbkYMg5"
            />
          )}

          {!this.state.visible && (
            <RecaptchaV2
              ref={(ref) => (this.recaptcha = ref)}
              theme="light"
              type="image"
              sitekey="6Lc9ZLIZAAAAAJUKhKsO1B0K62l41V45bGbkYMg5"
            />
          )}

         
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Form;
