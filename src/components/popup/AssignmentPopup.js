import React from "react";
import axios from "axios";
import onClickOutside from 'react-onclickoutside';
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import Typography from '@material-ui/core/Typography';

async function api(email,session,title,type,count){
  try{
      const response = await axios.post(process.env.REACT_APP_API_URI + '/api/v1/webgui/article_request', {
          email: email,
          session:session,
          title:title,
          type:type,
          count:count
      });
      if(response.status == 200){
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
      count:"2000",
      title:"",
      type:"0",
      isSignin:false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const result = await api(
      localStorage.getItem("email"),
      localStorage.getItem("session"),
      this.state.title,
      parseInt(this.state.type),
      parseInt(this.state.count)
    );
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
      case "count": this.setState({email:value});break;
      case "title": this.setState({title:value});break;
      case "type": this.setState({type:value});break;
    }
  }
  render(){
    return(
      <>
        {this.props.isPopup !== -1 &&
          <div className={this.props.isPopup ? 'popup popup_effect' : 'popup popup_effect_de'}>
            <PopupInner className="whir scroll-y">
              <Typography component="h2" variant="h6">
                記事の依頼を追加
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <RadioGroup aria-label="gender" name="gender1" value={this.state.type} onChange={(e) => this.handleChange("type",e.target.value)} style={{flexDirection:'row'}}>
                  <FormControlLabel value="0" control={<Radio />} label="歌詞解釈" />
                  <FormControlLabel value="1" control={<Radio />} label="特集記事" />
                </RadioGroup>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="title"
                  label="タイトル"
                  type="text"
                  id="title"
                  autoComplete="current-password"
                  value={this.state.title}
                  onChange={(e) => this.handleChange("title",e.target.value)}
                  style={{marginTop:'8px'}}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="count"
                  label="最低文字数"
                  type="number"
                  id="count"
                  autoComplete="current-password"
                  value={this.state.count}
                  onChange={(e) => this.handleChange("count",e.target.value)}
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
  padding:10px 20px 20px;
`

export default styled(onClickOutside(Popup))``;