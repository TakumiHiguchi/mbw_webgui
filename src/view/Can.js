import React from "react";
import axios from "axios";
import Slider from "react-slick";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Index from "./can/index";
import styled from "styled-components";
import { withRouter } from "react-router-dom";


const ENDPOINT = 'http://localhost:3020'
async function api(){
  try{
      const response = await axios.get(ENDPOINT + '/can')
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
      data:[]
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  async getData(){
    const result = await api();
    if(result[0]){
      let ins = result[1].map((data) =>{
        return [data.title,data.type,data.status,data.count]
      })
      this.setState({data:ins})
      
    }
  }

  async componentDidMount(){
    this.getData();
  }
  render(){
    const settings = {
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows:false,
      draggable:false,
      swipe:false,
      mobileFirst:true,
      afterChange: () =>
        this.setState(state => ({ updateCount: state.updateCount + 1 })),
      beforeChange: (current, next) => this.setState({ slideIndex: next })
    };
    return (
      <div className="App">
        <Header title={"執筆可能記事"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
            <Slider ref={slider => (this.slider = slider)} {...settings}>
              <Index data={this.state.data} />
            </Slider>
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