import React from "react";
import axios from "axios";
import Slider from "react-slick";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Index from "./can/index";
import Confirmation from "./can/Confirmation";
import styled from "styled-components";
import { withRouter } from "react-router-dom";



const ENDPOINT = 'http://localhost:3020'
async function api(){
  try{
      const response = await axios.get(ENDPOINT + '/api/v1/webgui/article_request/can?email='+localStorage.getItem("email")+'&session='+localStorage.getItem("session"))
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
      page:0,
      clickKey:"",
      count:0,
      data:[]
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  changePage(val,key,count){
    this.setState({page:val,clickKey:key,count:count})
  }
  async getData(){
    const result = await api();
    if(result[0]){
      let ins = result[1].map((data) =>{
        return [data.title,data.type,data.status,data.count,data.key]
      })
      this.setState({data:ins})
    }
  }
  async assign(){
    
    try{
      const response = await axios.post(ENDPOINT + '/api/v1/webgui/unapproved_article', {
          email: localStorage.getItem("email"),
          session:localStorage.getItem("session"),
          key:this.state.clickKey
      });
      
      if(response.data.status == "SUCCESS"){
          this.getData();
          this.props.history.push('/can/'+this.state.clickKey)
          return true
      }else{
          return false
      }
    }catch(e){
      console.log("通信に失敗しました。error="+e)
      return false
    }
    
  }
  async componentDidMount(){
    this.getData();
  }
  render(){
    return (
      <div className="App">
        <Header title={"執筆可能記事"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
            {this.state.page === 0 &&
              <Index data={this.state.data} change={(val,key,count) => this.changePage(val,key,count)}/>
            }
            {this.state.page === 1 &&
              <Confirmation clickKey={this.state.clickKey} count={this.state.count} change={(val,key,count) => this.changePage(val,key,count)} assign={() => this.assign()}/>
            }
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