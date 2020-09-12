import React from "react";
import axios from "axios";
import onClickOutside from 'react-onclickoutside';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
const ENDPOINT = 'https://mbwapi.herokuapp.com/'

async function api(email,name){
  try{
      const response = await axios.post(ENDPOINT + '/api/v1/webgui/plan_register', {
          email: localStorage.getItem("email"),
          session:localStorage.getItem("session"),
          userEmail: email,
          name: name,
      });
      if(response.data.status == "SUCCESS"){
          return true
      }else{
          return false
      }
      
  }catch(e){
    console.log("通信に失敗しました。")
    return false
  }
}

class Popup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      name:"",
      isSignin:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const name = event.target.name.value;
    const result = await api(email,name);
    if(result){
      this.props.reload();
      this.props.action(false);
    }
    
  }
  handleClickOutside() {
    this.props.action(false);
  }
  handleChange(type,value){
    switch(type){
      case "email": this.setState({email:value});break;
      case "name": this.setState({name:value});break;
    }
  }
  render(){
    return(
      <>
        {this.props.isPopup !== -1 &&
          <div className={this.props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'}>
            <PopupInner className="whir scroll-y">
              <Typography component="h2" variant="h6">
                登録予定者を追加
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
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
                  name="name"
                  label="名前"
                  type="email"
                  id="name"
                  autoComplete="current-password"
                  value={this.state.name}
                  onChange={(e) => this.handleChange("name",e.target.value)}
                  style={{marginBottom:'20px'}}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  作成する
                </Button>
              </form>
            </PopupInner>
          </div>
        }
      </>
    )
  }
}

const PopupInner = styled.div`
  padding:10px 20px;
`

export default styled(onClickOutside(Popup))``;