import React from "react";
import axios from "axios";
import Slider from "react-slick";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Editor from "../../components/Editor";
import InspectionDialog from "../../components/Dialog/InspectionDialog";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Inspection extends React.Component{
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
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  
  async getData(key,email,session){
    try{
        const response = await axios.get(process.env.REACT_APP_API_URI + '/api/v1/webgui/admin/article_request/'+key+'/edit?email='+email+'&session='+session)
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

  async reSubmit(key){
    try{
        const response = await axios.post(process.env.REACT_APP_API_URI + '/api/v1/webgui/admin/article_request/resubmit', {
          email: localStorage.getItem("email"),
          session:localStorage.getItem("session"),
          key:key
      });
      if(response.status == 200){
          return true
      }else{
          console.log(response)
          return false
      }
        
    }catch(e){
      console.log("通信に失敗しました。"+e)
      return false
    }
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
  handleOnSubmit(type){
    const {key} = this.props.match.params
    if(type === 0){
      const result = this.reSubmit(key);
      if(result) this.props.history.push('/')
    }else{

    }
  }
  async postArticle(description,releaseTime,tags,thumbnail){
    const {key} = this.props.match.params;
    try{
      const response = await axios.post(process.env.REACT_APP_API_URI + '/api/v1/webgui/article', {
        email: localStorage.getItem("email"),
        session:localStorage.getItem("session"),
        key:key,
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
    const {key} = this.props.match.params
    const result = await this.getData(key,localStorage.getItem("email"),localStorage.getItem("session"));
    if(result[0]){
      const count = result[1].content.replace( /<blockquote>(.*)<\/blockquote>/g , "" ).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').length -1
      this.setState({
        mainInsCont:result[1].content,
        count:result[1].count,
        apiEnd:true,
        chrCount:count,
        title:result[1].title,
      })
    }else{
      this.props.history.push('/')
    }
  }
  render(){
    const {key} = this.props.match.params
    return (
      <div className="App">
        <Header title={key + "を検修"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
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
                    style={{marginRight:'15px'}}
                    onClick={() => this.handleOnSubmit(0)}
                  >
                    再提出させる
                  </Button>
                  {parseInt(this.state.chrCount) <= parseInt(this.state.count) ?
                    <Button
                      disabled
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      詳細設定
                    </Button>
                  :
                    <Button
                      
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => this.setState({isOpen:true})}
                    >
                      詳細設定
                    </Button>
                  }
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
                  {this.state.apiEnd &&
                    <Editor 
                      change={(val) => this.handleOnChange(val)}
                      htmlIns={this.state.mainInsCont}
                      musicName={this.state.musicName}
                      artist={this.state.artist}
                    />
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
          </Main>
        </MainRoot>
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
export default withRouter(styled(Inspection)``);