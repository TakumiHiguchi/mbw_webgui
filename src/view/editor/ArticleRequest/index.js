import React from "react";
import axios from "axios";
import Defaulttemplate from "../../../components/templates/DefaultTemplate";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AssignmentTable from "../../../components/templates/AssignmentTable";

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
      const response = await axios.get(process.env.REACT_APP_API_URI + '/api/v1/webgui/editor/article_request?email='+localStorage.getItem("email")+'&session='+localStorage.getItem("session"))
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
          case 1: status="ユーザーが執筆しています";break;
          case 2: status="記事を研修してください";break;
          case 3: status="再提出";break;
        }
        
        return({
          title:data.title,
          type:data.type,
          status:data.status,
          typeString:type,
          statusString:status,
          key:data.key,
          maxAge:data.maxAge,
          count:data.count,
          submissionTime:data.submissionTime,
          user_name: data.user_name
        })
      })
      this.setState({data:ins})
    }
  }

  async componentDidMount(){
    this.getData();
  }
  render(){
    return (
      <Defaulttemplate title={"検修可能記事"} is_signined>
          <Main style={styles.main}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={12} >
                  <AssignmentTable 
                    label={["タイトル","種類","状況","最低文字数","納期","提出","提出者",""]}
                    rows={this.state.data}
                    action={{
                      click:(status,key) => this.props.history.push('/editor/assignment/'+key + '/edit')
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Main>
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
export default withRouter(styled(Assignment)``);