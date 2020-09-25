import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import Recaptcha from "react-google-invisible-recaptcha";
import RecaptchaV2 from "react-google-recaptcha";
import api from "../services/api";
import api1 from "../services/api";

 export class Form extends Component {
   state = {
     visible: true,
     isVerified: false,
       logado: false,
       loading: false
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
         alert("Pontuação: " + data.score);
            if(data.score < 1){
                this.setState({ visible: false, logado: false  });
            }else{
                this.setState({ visible: true, logado: true });
            }
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
       .then(async ({ data }) =>{
           console.log('dados v2',data);
         alert("Pontuação: " + data.score);
            await this.setState({ loading:true });
           if(data.success){
               await this.setState({ visible: true, logado: true  });
           }else{
               await this.setState({ visible: false, logado: false });
               await this.setState({ loading:false });
           }
       })
       .catch((error) => {
         alert("Falha de comunicação");
       });
   }

   render() {
     return (
       <MuiThemeProvider>
         <React.Fragment>
           <AppBar title={this.state.logado ? "Logado" : "Recaptcha Demo"} />
       
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
               sitekey="6Lfi_LAZAAAAAHtCuTsaB9kEbvRqvcREmNtdFiCf"

            />) : !this.state.loading ? (<div><RecaptchaV2 ref={(ref) => (this.recaptcha = ref)}
                 sitekey="6LcztrwZAAAAADEmAqbYHp8Judq8f7hL3yocoWi7"
               /> </div>) : <h1>Carregando...</h1>}
         </React.Fragment>
       </MuiThemeProvider>
     );
   }
 }

 export default Form;
