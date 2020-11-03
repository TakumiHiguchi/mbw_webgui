import React from "react";
import axios from "axios";
import Slider from "react-slick";
import Editor from "../../../components/Editor";
import InspectionDialog from "../../../components/Dialog/InspectionDialog";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import PageTemplate from "../../../components/templates/page";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isSidebar:true,
      isOpen:false,
      mainInsCont:'',
      rWindow:{isRWindow:0,type:0,mes:""},
      artist:"artist",
      musicName:"musicName",
      count:0,
      chrCount:0,
      apiEnd:false,
      title:"",
      description:"",
      editorType:true,
    }
  }
  async postArticle(description,releaseTime,tags,thumbnail){
    try{
      const response = await axios.post(process.env.REACT_APP_API_URI + '/api/v1/webgui/admin/article', {
        email: localStorage.getItem("email"),
        session:localStorage.getItem("session"),
        title:this.state.title,
        content:this.state.mainInsCont,
        description:description,
        releaseTime:releaseTime,
        thumbnail:thumbnail,
        tags:tags
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
  async componentDidMount(){

  }
  handleOnChange(val){
    const count = val.replace( /<blockquote>(.*)<\/blockquote>/g , "" ).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').length -1
    this.setState({mainInsCont:val,chrCount:count});
  }
  handleOnTfChange(type,value){
    switch(type){
      case "title": this.setState({title:value});break;
      case "description": this.setState({description:value});break;
    }
  }
  render(){
    return (
      <PageTemplate>
        <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={12} className="flex-jus-between">
                <Grid item xs={12} md={8} lg={10} >
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      required
                      name="title"
                      label="タイトル"
                      type="text"
                      id="title"
                      style={{margin:'0 15px 0 0'}}
                      value={this.state.title}
                      onChange={(e) => this.handleOnTfChange("title",e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={8} lg={5} style={{textAlign:'right'}}>
                  <div style={{display:'inline-block',marginRight:'15px'}}>{this.state.chrCount} / {this.state.count}文字</div>
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => this.setState({editorType:!this.state.editorType})}
                    >
                      切り替え
                    </Button>
                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => this.setState({isOpen:true})}
                    >
                      公開
                    </Button>

                </Grid>
              </Grid>
              <Grid item xs={12} md={8} lg={4} >
                <Card style={{height:'calc(100vh - 184px)'}} >
                  <CardContent style={{height:'calc(100% - 32px)'}}>
                    <p className="scroll-y" style={{height:'100%',margin:0}} dangerouslySetInnerHTML={{__html: this.state.mainInsCont}}></p>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8} lg={8} >
                <Card style={{height:'calc(100vh - 204px)',padding:'10px'}}>
                  {this.state.editorType ?
                    <Editor 
                        change={(val) => this.handleOnChange(val)}
                        htmlIns={this.state.mainInsCont}
                        musicName={this.state.musicName}
                        artist={this.state.artist}
                    />
                  :
                    <textarea value={this.state.mainInsCont} onChange={(val) => this.handleOnChange(val.target.value)} style={{width:'100%',height:'100%'}}/>
                  }
                </Card>
              </Grid>
            </Grid>
          </Container>
          <InspectionDialog 
            isOpen={this.state.isOpen} 
            setOpen={(val) => this.setState({isOpen:val})}
            submit={(description,releaseTime,tags,thumbnail) => this.postArticle(description,releaseTime,tags,thumbnail)}
          />
      </PageTemplate>
    );
  }
}

const Tr = styled.div`
  display:flex;
  width:100%;
  padding:10px 0;
  border-bottom:1px solid #f0f0f0;
`
const Td = styled.div`
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  max-width: 100%;
  font-size: 0.9em;
  line-height:25px;
  min-height: 25px;
  text-decoration:none;
`
const Main = styled.main`
  width:100%;
  padding-top:20px;
`

export default withRouter(styled(HomePage)``);