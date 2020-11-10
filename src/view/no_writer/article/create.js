import React from "react";
import axios from "axios";
import Defaulttemplate from "../../../components/templates/DefaultTemplate";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Editor from "../../../components/Editor/InterpretationArticleEditor";
import TextField from '../../../components/input/textField';
import SubmitBotton from '../../../components/input/submitButton';
import Dialog from '../../../components/Dialog/no_writer_article_confirmDialog';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class CreatePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isOpen:false,
      page:0,
      clickKey:"",
      count:0,
      chrCount: 0,
      data:[],
      content: ''
    }
  }
  handleOnChange(val, count){
    // const count = val.replace( /<blockquote>(.*)<\/blockquote>/g , "" ).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').length
    if(val == "<p></p>") val = '';
    this.setState({content:val, chrCount:count});
  }
  handleOnTfChange(type,value){
    switch(type){
      case "artist": this.setState({artist:value});break;
      case "musicName": this.setState({musicName:value});break;
    }
  }

  async handleOnSubmit(type){
    this.setState({isOpen:true});
  }

  render(){
    return (
      <Defaulttemplate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12} className="flex-jus-between">
            <div>
              <TextField label="アーティスト" id="artist" value={this.state.artist} style={{margin:'0 15px 0 0'}} onChange={(e) => this.handleOnTfChange("artist",e)} />
              <TextField label="曲名" id="musicName" value={this.state.musicName} style={{margin:'0 15px 0 0'}} onChange={(e) => this.handleOnTfChange("musicName",e)} />
            </div>
            <div>
              <div style={{display:'inline-block',marginRight:'15px'}}>{this.state.chrCount} / 2000文字</div>
              <SubmitBotton label="提出する" color="primary" onClick={() => this.handleOnSubmit(1)} disabled={parseInt(this.state.chrCount) < 2000}/>
            </div>
          </Grid>
          <Grid item xs={12} md={8} lg={4} >
            <Card style={{height:'calc(100vh - 184px)'}} >
              <CardContent style={{height:'calc(100% - 32px)'}}>
                <p className="scroll-y" style={{height:'100%',margin:0}} dangerouslySetInnerHTML={{__html: this.state.content}}></p>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8} lg={8} >
            <Card style={{height:'calc(100vh - 204px)',padding:'10px'}}>
              <Editor change={(val, count) => this.handleOnChange(val, count)} htmlIns={this.state.content} musicName={this.state.musicName} artist={this.state.artist} />
            </Card>
          </Grid>
        </Grid>
        <Dialog isOpen={this.state.isOpen} setOpen={(val) => this.setState({isOpen: val})} content={this.state.content}/>
      </Defaulttemplate>
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

export default withRouter(styled(CreatePage)``);