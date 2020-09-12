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
import CancelIcon from '@material-ui/icons/Cancel';
import Container from '@material-ui/core/Container';
import { withRouter } from "react-router-dom";
import ResultWindow from '../components/ResultWindow'

const ENDPOINT = 'https://mbwapi.herokuapp.com/'

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

async function api(key,session){
  try{
      const response = await axios.get(ENDPOINT + '/api/v1/webgui/plan_register/'+key+'?session='+session);
      console.log(response)
      return response.data
  }catch(e){
    console.log("通信に失敗しました。")
    return false
  }
}

async function signup(email,password,key,session){
  try{
      const response = await axios.post(ENDPOINT + '/api/v1/webgui/writer/signup', {
          email: email,
          phrase: password,
          key:key,
          session:session
      });
      
      return response.data
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
      params:{},
      rWindow:{isRWindow:0,type:0,mes:""},
      pSmes:false,
      user:{
        name:"",
        email:""
      },
      expired:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(type,value){
    switch(type){
      case "password": 
        this.setState({
          password:value,
          pSmes:value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,12}$/)
          
        });
        break;
    }
    
  }
  rWindow(window_bool,type,cont){
    let ins = this.state.rWindow;
    if(window_bool){
        ins.isRWindow = window_bool;
    }else{
        if(ins.isRWindow !== 0){
            ins.isRWindow = window_bool;
        }
    }
    
    ins.type = type;
    ins.mes = cont;
    this.setState({rWindow:ins});
  }
  async handleSubmit(event) {
    event.preventDefault();
    const password = event.target.password.value;
    this.rWindow(true,0,"作成中...");
    const result = await signup(this.state.user.email,password,this.state.params.k,this.state.params.s);
    if(result){
      if(result.status == "SUCCESS"){
        //作成成功
        this.rWindow(true,1,"アカウントを作成しました。サインインしてください");
        setTimeout(async () => {
          this.props.history.push('/')
        }, 3000);
      }else{
        this.rWindow(true,1,"アカウントの作成に失敗しました");
      }
    }else{
      this.rWindow(true,1,"エラーが発生しました");
    }
  }

  componentWillMount() {
    const session = localStorage.getItem("session");
    const maxAge = localStorage.getItem("maxAge");
    if(session && maxAge > new Date().getTime()/1000){
      //あった場合リダイレクト
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    //パラメータ習得
    let urlParamStr = window.location.search
    let params = {}
    if (urlParamStr) {
      urlParamStr = urlParamStr.substring(1)
      urlParamStr.split('&').forEach( param => {
        const temp = param.split('=')
        params = {
          ...params,
          [temp[0]]: temp[1]
        }
      });
      this.setState({params:params});
    }else{
      this.setState({expired:true});
    }
    this.checkParams(params)
  }

  async checkParams(params){
    if(params.s != null && params.k != null){
      const result = await api(params.k,params.s);
      if(result && result.status == "SUCCESS"){
        const user = result.result[0];
        this.setState({user:{name:user.name,email:user.email}})
      }else{
        this.setState({expired:true});
      }
    }
  }

  render(){
    const user = this.state.user;
    return (
      <Container component="main" maxWidth="xs">
        {user.name != "" && user.email != "" ?
          <>
            <CssBaseline />
            <div style={Styles.paper}>
              <Avatar style={Styles.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                パスワードを登録
              </Typography>
              <form style={Styles.form} noValidate onSubmit={this.handleSubmit}>
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
                {!this.state.pSmes &&
                  <div>半角6~12文字英大文字・小文字・数字それぞれ１文字以上含む必要があります</div>
                } 
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={user.name + "さんでお間違いありませんか？"}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={Styles.submit}
                >
                  サインアップ
                </Button>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </>
        :
          <>
            {this.state.expired ?
              <>
                <CssBaseline />
                <div style={Styles.paper}>
                  <Avatar style={Styles.avatar}>
                    <CancelIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    トークンの有効期限切れ
                  </Typography>
                </div>
              </>
            :
              <>
                <CssBaseline />
                <div style={Styles.paper}>
                  <span class="loading41">Loading<span></span></span>
                </div>
              </>
              
            }
          </>
        }
        <ResultWindow value={this.state.rWindow} action={(a,b,c) => this.rWindow(a,this.state.rWindow.type,this.state.rWindow.mes)}/>
      </Container>
    );
  }
}

export default withRouter(SignIn)
