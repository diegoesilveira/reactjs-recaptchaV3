import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Recaptcha from "react-google-invisible-recaptcha";
import RecaptchaV2 from "react-google-recaptcha";
import api from "../services/api";

 export class Form extends Component {
   state = {
     visible: true,
     isVerified: false,
   };

   sendMessage = ({ visible }) => {

   if ( this.state.visible) {
       this.recaptcha.execute().then((value) => {
         this.sendTokenV3(value);
         alert("Token V3:  " + value);
       });
     } else {

       alert("Token V2: " + this.recaptcha.getValue());
       this.sendTokenV2(this.recaptcha.getValue());
     }
   };

   async sendTokenV3(value) {
     await api
       .post("/recaptchav3", {
         token: value,
       })
       .then(({ data }) => {
         alert("Pontuação: " + data);
          this.setState({ visible: false });
       })
       .catch((error) => {
         alert("Falha de comunicação");
         
       });
   }

   async sendTokenV2(value) {
     await api
       .post("/recaptchav2", {
         token: value,
       })
       .then(({ data }) => {
         alert("Pontuação: " + data);
 this.setState({ visible: true });
       })
       .catch((error) => {
         alert("Falha de comunicação");
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
             disabled={this.state.isVerified}
           />
          
           {this.state.visible ? (
             <Recaptcha
               ref={(ref) => (this.recaptcha = ref)}
               sitekey="6Lc9ZLIZAAAAAJUKhKsO1B0K62l41V45bGbkYMg5"

            />) : (<div><RecaptchaV2 ref={(ref) => (this.recaptcha = ref)}
                 sitekey="6LeYuskZAAAAAI1UI_n3_eBK4BCWSEw6XIFARVnT"
               /> </div>)}
         </React.Fragment>
       </MuiThemeProvider>
     );
   }
 }

 export default Form;
