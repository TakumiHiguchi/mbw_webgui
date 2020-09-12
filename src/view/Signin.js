import React from 'react';
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";

const ENDPOINT = 'http://localhost:3020'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

async function api(email,password){
  try{
      const response = await axios.post(ENDPOINT + '/api/v1/webgui/writer/signin', {
          email: email,
          phrase: password,
      });
      
      if(response.data.status == "SUCCESS"){
          localStorage.setItem("session", response.data.session);
          localStorage.setItem("email", email);
          localStorage.setItem("maxAge", response.data.maxAge);
          return true
      }else{
          return false
      }
      
  }catch(e){
    console.log("通信に失敗しました。")
    return false
  }
}

const Styles = {
  paper: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin:'10px'
    
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    margin:'10px'
  },
  submit: {
    marginTop:'10px'
  },
};

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      isSignin:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(type,value){
    switch(type){
      case "email": this.setState({email:value});break;
      case "password": this.setState({password:value});break;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const result = await api(email,password);
    if(result)this.props.history.push('/')
  }

  componentWillMount() {
    const session = localStorage.getItem("session");
    const maxAge = localStorage.getItem("maxAge");
    if(session && maxAge > new Date().getTime()/1000){
      //あった場合リダイレクト
      this.props.history.push('/')
    }
  }
  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={Styles.paper}>
          <Avatar style={Styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            サインイン
          </Typography>
          <form style={Styles.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={(e) => this.handleChange("email",e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(e) => this.handleChange("password",e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={Styles.submit}
            >
              サインイン
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withRouter(SignIn)
