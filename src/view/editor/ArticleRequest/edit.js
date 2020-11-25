import React from "react";
import axios from "axios";
import Defaulttemplate from "../../../components/templates/DefaultTemplate";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Editor from "../../../components/Editor/InterpretationArticleEditor";
import TextField from '../../../components/input/textField';
import SubmitBotton from '../../../components/input/submitButton';
import InspectionDialog from "../../../components/Dialog/InspectionDialog";
import ResultWindow from '../../../components/ResultWindow'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class EditPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      isClassicEditor: false,
      apiend:false,
      count:0,
      chrCount: 0,
      content: '',
      title: '',
      editor:'',
      rWindow:{isRWindow:0,type:0,mes:""},
    }
  }
  handleOnChange(val, count){
    this.setState({content:val, chrCount:count});
  }
  handleOnTfChange(type,value){
    switch(type){
      case "title": this.setState({title:value.target.value});break;
    }
  }

  async handleOnSubmit(type){
    this.setState({isOpen:true});
  }

  async componentDidMount(){
    const {key} = this.props.match.params
    const result = await this.getData(key,localStorage.getItem("email"),localStorage.getItem("session"));
    if(result[0]){
      await this.setState({
        content:result[1].content,
        count:result[1].count,
        title:result[1].title,
        apiend:true
      })
    }else{
      this.props.history.push('/')
    }
  }

  render(){
    return (
      <Defaulttemplate title={"執筆可能記事"}　is_signined>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12} className="flex-jus-between">
            <Grid item xs={12} md={8} lg={10} >
              <TextField label="タイトル" id="title" value={this.state.title} style={{margin:'0 15px 0 0'}} onChange={(e) => this.handleOnTfChange("title",e)} fullWidth/>
            </Grid>
            <Grid item xs={12} md={8} lg={5} style={{textAlign:'right'}}>
              <div style={{display:'inline-block',marginRight:'15px'}}>{this.state.chrCount} / 2000文字</div>
              <SubmitBotton label="再提出させる" onClick={() => this.reSubmit()} style={{marginRight:'15px'}} />
              <SubmitBotton label="提出する" color="primary" onClick={() => this.handleOnSubmit(1)} disabled={parseInt(this.state.chrCount) < 2000}/>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} lg={4} >
            <Card style={{height:'calc(100vh - 184px)'}} >
              <CardContent style={{height:'calc(100% - 32px)'}}>
                <div style={{paddingBottom:10,borderBottom:"1px solid rgba(0, 0, 0, 0.12)"}}>
                  <SubmitBotton label="切り替え" onClick={() => this.setState({isClassicEditor: !this.state.isClassicEditor})} style={{marginRight:'15px'}} />
                </div>
                <p className="scroll-y" style={{height:'100%',margin:0}} dangerouslySetInnerHTML={{__html: this.state.content.replace( /<p>&lt;#interprationBlock&gt;<\/p>/g , '<div class="box1"><span class="box1-title">解釈</span>' ).replace( /<p>&lt;\/#interprationBlock&gt;<\/p>/g , '</div>' )}}></p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8} lg={8} >
            <Card style={{height:'calc(100vh - 204px)',padding:'10px'}}>
            {this.state.apiend &&
              <Editor change={(val, count) => this.handleOnChange(val, count)} htmlIns={this.state.content} musicName={this.state.musicName} artist={this.state.artist} isClassicEditor={this.state.isClassicEditor} />
            }
            </Card>
          </Grid>
        </Grid>
        <InspectionDialog 
          isOpen={this.state.isOpen} 
          setOpen={(val) => this.setState({isOpen:val})}
          submit={(description,releaseTime,tags,thumbnail) => this.postArticle(description,releaseTime,tags,thumbnail)}
        />
        <ResultWindow value={this.state.rWindow} action={(a,b,c) => this.rWindow(a,this.state.rWindow.type,this.state.rWindow.mes)}/>
      </Defaulttemplate>
    );
  }

  async getData(key,email,session){
    try{
      const response = await axios.get(process.env.REACT_APP_API_URI + '/api/v1/webgui/editor/article_request/'+key+'/edit?email='+email+'&session='+session)
      if(response.status == 200){
        return [true,response.data.result]
      }else{
        return [false,null]
      }
    }catch(e){
      console.log("通信に失敗しました。")
      return [false,null]
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

  async reSubmit(){
    const {key} = this.props.match.params
    try{
      const response = await axios.post(process.env.REACT_APP_API_URI + '/api/v1/webgui/editor/article_request/resubmit', {
        email: localStorage.getItem("email"),
        session:localStorage.getItem("session"),
        key:key
      });
      if(response.status == 200){
        this.props.history.push('/')
      }else{
        console.log(response)
        return false
      }
    }catch(e){
      console.log("通信に失敗しました。"+e)
      return false
    }
  }

  async postArticle(description,releaseTime,tags,thumbnail){
    const {key} = this.props.match.params;
    try{
      this.rWindow(true,0,"保存中");
      const response = await axios.post(process.env.REACT_APP_API_URI + '/api/v1/webgui/editor/article', {
        email: localStorage.getItem("email"),
        session:localStorage.getItem("session"),
        key:key,
        title:this.state.title,
        content:this.state.content.replace( /<p>&lt;#interprationBlock&gt;<\/p>/g , '<div class="box1"><span class="box1-title">解釈</span>' ).replace( /<p>&lt;\/#interprationBlock&gt;<\/p>/g , '</div>' ),
        description:description,
        releaseTime:releaseTime,
        thumbnail:thumbnail,
        tags:tags
      });
      if(response.status == 200){
          this.rWindow(true,1,"保存しました");
          this.props.history.push('/')
      }else{
        this.rWindow(true,1,"保存に失敗しました");
          return false
      }
    }catch(e){
      this.rWindow(true,1,"保存に失敗しましたerror: " + e);
      return false
    }
  }
}

export default withRouter(styled(EditPage)``);