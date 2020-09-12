import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import WrittenTable from "../components/templates/WrittenTable";
import axios from "axios";

const ENDPOINT = 'https://mbwapi.herokuapp.com/'

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isSidebar:true,
      data:[]
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  async getData(){
    try{
      const response = await axios.get(ENDPOINT + '/api/v1/webgui/unapproved_article?email='+localStorage.getItem("email")+'&session='+localStorage.getItem("session"));
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
  async componentDidMount(){
    const result = await this.getData();
    if(result[0]){
      let ins = result[1].map((data) =>{
        let type = ''
        let status = ''
        switch(data.type){
          case 0: type="歌詞解釈";break;
          case 1: type="特集記事";break;
        }
        switch(data.status){
          case 0: status="ERROR";break;
          case 1: status="下書き";break;
          case 2: status="研修中";break;
          case 3: status="再提出";break;
          case 4: status="完成済み";break;
        }
        if(Math.floor(new Date().getTime()/1000) > data.maxAge){
          status = "提出期限切れ"
        }
        return {title:data.title,type:data.type,status:data.status,typeString:type,statusString:status,key:data.key,maxAge:data.maxAge}
      })
      this.setState({data:ins})
    }
  }
  render(){
    return (
      <div className="App">
        <Header title={"執筆済み記事"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={12} >
                  <WrittenTable 
                    label={["名前","記事の種類","ステータス","納期",""]}
                    rows={this.state.data}
                    action={{
                      click:(status,key) => this.props.history.push('/can/'+key)
                    }}
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
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display:none;
  }
`

const styles={
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}
export default withRouter(styled(HomePage)``);