import React from "react";
import axios from "axios";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PageTemplate from "../../../components/templates/page";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from "../../../components/templates/Table";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';


const ENDPOINT = 'https://mbwapi.herokuapp.com/'

async function api(email,name){
  try{
      const response = await axios.get(ENDPOINT + '/api/v1/webgui/article');
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
      data:[],
      isPopup:-1,
    }
  }
  async getData(){
    const result = await api();
    console.log(result)
    if(result[0]){
      let ins = result[1].map((data) =>{
        const count = data.content.replace( /<blockquote>(.*)<\/blockquote>/g , "" ).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').length
        return [data.title,data.key,data.releaseTime,count]
      })
      this.setState({data:ins})
    }
  }

  async componentDidMount(){
    this.getData();
  }
  render(){
    return (
      <PageTemplate>
        <Container maxWidth="lg">
          <Button variant="contained" color="primary" style={{marginBottom:"30px"}} 
                onClick={() => this.props.history.push('/article/create')}
          >
            新しく作成する
          </Button>
          <Grid container spacing={3}>
            <Tr style={{background:'#f0f0f0'}}>
                <Td style={{width:'30%',textAlign:'center'}}>タイトル</Td>
                <Td style={{width:'20%',textAlign:'center'}}>公開日</Td>
                <Td style={{width:'20%',textAlign:'center'}}>key</Td>
                <Td style={{width:'20%',textAlign:'center'}}>文字数</Td>
                <Td style={{width:'10%',textAlign:'center'}}>公開非公開</Td>
            </Tr>
            {this.state.data.map((article) =>
              <Tr>
                <Td style={{width:'30%'}}>{article[0]}</Td>
                <Td style={{width:'20%',textAlign:'center'}}>{new Date(article[2] * 1000).toLocaleDateString()}</Td>
                <Td style={{width:'20%',textAlign:'center'}}><a href={"https://mbw1.herokuapp.com/article/" + article[1]} target="_blank">{article[1]}</a></Td>
                <Td style={{width:'20%',textAlign:'center'}}>{article[3]}</Td>
                <Td style={{width:'10%',textAlign:'center'}}>
                  {article[2] < new Date().getTime() / 1000 ?
                    <>公開</>
                  :
                    <>非公開</>
                  }
                </Td>
              </Tr>
            )}
          </Grid>
        </Container>
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