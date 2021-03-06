import React from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Editor from "../../components/Editor/InterpretationArticleEditor";
import ResultWindow from '../../components/ResultWindow'

import styled from "styled-components";
import { withRouter,useParams } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '../../components/input/textField';
import SubmitBotton from '../../components/input/submitButton';


let nTimer;
async function getArticleData(key,email,session){
  try{
      const response = await axios.get(process.env.REACT_APP_API_URI + '/api/v1/webgui/unapproved_article/'+key+'/edit?email='+email+'&session='+session)
      
      if(response.status === 200){
          return [true,response.data.result]
      }else{
          return [false,null]
      }
      
  }catch(e){
    console.log("通信に失敗しました。")
    return [false,null]
  }
}
async function updateArticle(key,content,type){
  let isSubmission = false
  if(type === 0) isSubmission = true;
  try{
      const response = await axios.patch(process.env.REACT_APP_API_URI + '/api/v1/webgui/unapproved_article/'+key, {
        email: localStorage.getItem("email"),
        session:localStorage.getItem("session"),
        key:key,
        content:content,
        isSubmission:isSubmission
    });
    if(response.status == 200){
        return true
    }else{
        
        return false
    }
      
  }catch(e){
    console.log("通信に失敗しました。"+e)
    return false
  }
}

class Edit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isSidebar:true,
      mainInsCont:'',
      rWindow:{isRWindow:0,type:0,mes:""},
      artist:"",
      musicName:"",
      count:0,
      chrCount:0,
      apiEnd:false
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  handleOnChange(val, count){
    this.setState({mainInsCont:val,chrCount:count});
    if(nTimer){clearTimeout(nTimer);}
    nTimer = setTimeout(async () => {
      this.rWindow(true,0,"保存中");
      const {key} = this.props.match.params
      const result = await updateArticle(key,this.state.mainInsCont,1)
      if(result) this.rWindow(true,1,"記事を下書きに保存しました");
    }, 5000);
  }
  handleOnTfChange(type,value){
    switch(type){
      case "artist": this.setState({artist:value});break;
      case "musicName": this.setState({musicName:value});break;
    }
  }
  async handleOnSubmit(type){
    const {key} = this.props.match.params
    const result = await updateArticle(key,this.state.mainInsCont,type)
    if(result) this.props.history.push('/')
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

  async componentDidMount(){
    const {key} = this.props.match.params
    const result = await getArticleData(key,localStorage.getItem("email"),localStorage.getItem("session"))

    if(result[0]){
      this.setState({mainInsCont:result[1].content,count:result[1].count,apiEnd:true,chrCount:"計測中"})
    }else{
      this.props.history.push('/')
    }
  }
  render(){
    return (
      <div className="App">
        <Header title={"執筆可能記事"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={12} className="flex-jus-between">
                <div>
                  <TextField label="アーティスト" id="artist" value={this.state.artist} style={{margin:'0 15px 0 0'}} onChange={(e) => this.handleOnTfChange("artist",e.target.value)} />
                  <TextField label="曲名" id="musicName" value={this.state.musicName} style={{margin:'0 15px 0 0'}} onChange={(e) => this.handleOnTfChange("musicName",e.target.value)} />
                </div>
                <div>
                  <div style={{display:'inline-block',marginRight:'15px'}}>{this.state.chrCount} / {this.state.count}文字</div>
                  <SubmitBotton label="下書きに保存する" color="contained" onClick={() => this.handleOnSubmit(1)} style={{marginRight:'15px'}} />
                  <SubmitBotton label="提出する" color="primary" onClick={() => this.handleOnSubmit(0)} disabled={parseInt(this.state.chrCount) <= parseInt(this.state.count)}/>
                </div>
              </Grid>
              <Grid item xs={12} md={8} lg={4} >
                <Card style={{height:'calc(100vh - 184px)'}} >
                  <CardContent style={{height:'calc(100% - 32px)'}}>
                    <p className="scroll-y" style={{height:'100%',margin:0}} dangerouslySetInnerHTML={{__html: this.state.mainInsCont.replace( /<p>&lt;#interprationBlock&gt;<\/p>/g , '<div class="box1"><span class="box1-title">解釈</span>' ).replace( /<p>&lt;\/#interprationBlock&gt;<\/p>/g , '</div>' )}}></p>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8} lg={8} >
                <Card style={{height:'calc(100vh - 204px)',padding:'10px'}}>
                  {this.state.apiEnd &&
                    <Editor change={(val, count) => this.handleOnChange(val, count)} htmlIns={this.state.mainInsCont} musicName={this.state.musicName} artist={this.state.artist} isClassicEditor={this.state.isClassicEditor} />
                  }
                </Card>
              </Grid>
            </Grid>
          </Container>
          </Main>
        </MainRoot>
        <ResultWindow value={this.state.rWindow} action={(a,b,c) => this.rWindow(a,this.state.rWindow.type,this.state.rWindow.mes)}/>
      </div>
    );
  }
}
const MainRoot = styled.div`
  display:flex;
  padding-top:64px;
  height:calc(100vh - 64px)
`
const Main = styled.main`
  width:100%;
  padding-top:20px;
`

const styles={
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}
export default withRouter(styled(Edit)``);