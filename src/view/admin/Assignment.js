import React from "react";
import GenericTemplate from "../../components/dashboard/Dashboard";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Popup from "../../components/popup/AssignmentPopup";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AssignmentTable from "../../components/templates/AssignmentTable";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';


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

async function api(){
  try{
      const response = await axios.get(ENDPOINT + '/api/v1/webgui/article_request?email='+localStorage.getItem("email")+'&session='+localStorage.getItem("session"))
      if(response.data.status == "SUCCESS"){
          return [true,response.data.result]
      }else{
          return [false,null]
      }
      
  }catch(e){
    console.log("通信に失敗しました。")
    return [false,null]
  }
}

class Assignment extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isSidebar:true,
      data:[],
      isPopup:-1,
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  async getData(){
    const result = await api();
    if(result[0]){
      let ins = result[1].map((data) =>{
        let type = ''
        let status = ''
        switch(data.type){
          case 0: type="歌詞解釈";break;
          case 1: type="特集記事";break;
        }
        switch(data.status){
          case 0: status="依頼中";break;
          case 1: status="ユーザーが執筆しています";break;
          case 2: status="記事を研修してください";break;
          case 3: status="再提出";break;
        }
        
        return {title:data.title,type:data.type,status:data.status,typeString:type,statusString:status,key:data.key,maxAge:data.maxAge,count:data.count,submissionTime:data.submissionTime}
      })
      this.setState({data:ins})
    }
  }

  async componentDidMount(){
    this.getData();
  }
  render(){
    return (
      <div className="App">
        <Header title={"記事を依頼"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
            <Container maxWidth="lg">
              <Button variant="contained" color="primary" style={{marginBottom:"10px"}} 
                onClick={() => this.setState({isPopup:true})}
              >
                新しく作成する
              </Button>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={12} >
                  <AssignmentTable 
                    label={["タイトル","種類","状況","最低文字数","納期","提出",""]}
                    rows={this.state.data}
                    action={{
                      click:(status,key) => this.props.history.push('/assignment/'+key)
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Main>
          <Popup 
            isPopup={this.state.isPopup} 
            action={(val) => this.setState({isPopup:val})}
            reload={() => this.getData()}
          />
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
export default withRouter(styled(Assignment)``);