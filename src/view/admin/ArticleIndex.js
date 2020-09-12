import React from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from "../../components/templates/Table";
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

async function api(email,name){
  try{
      const response = await axios.get(ENDPOINT + '/api/v1/webgui/article?email='+localStorage.getItem("email")+'&session='+localStorage.getItem("session"));
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

class HomePage extends React.Component{
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
    console.log(result)
    if(result[0]){
      let ins = result[1].map((data) =>{
        return [data.title,data.key,data.releaseTime]
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
        <Header title={"記事一覧"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={12} >
                  <Table 
                    label={["名前","ステータス","URL"]}
                    rows={this.state.data}
                  />
                </Grid>
              </Grid>
            </Container>
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
export default withRouter(styled(HomePage)``);