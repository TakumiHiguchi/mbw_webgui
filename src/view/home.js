import React from "react";
import GenericTemplate from "../components/dashboard/Dashboard";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from "../components/templates/Table";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ENDPOINT = 'http://localhost:3020'
class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isSidebar:true,
      unitPrice:[["解釈記事","0.5円/1文字","￥500"]],
      count:[0,0,0,0,0],
      payment:[0,0,0]
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  async getData(email,session){
    try{
        const response = await axios.get(ENDPOINT + '/home?email='+email+'&session='+session)
        console.log(response)
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
    const result = await this.getData(localStorage.getItem("email"),localStorage.getItem("session"));
    if(result[0]){
      console.log(result[1])
      this.setState({count:[
        result[1].unaccepted.length,
        result[1].resubmit.length,
        result[1].draft.length,
        result[1].completeMonth.length,
        result[1].complete.length
      ]})
      if(result[1].payment.unsettled !== void 0){
        this.setState({
          payment:[
            result[1].payment.unsettled,
            result[1].payment.confirm,
            result[1].payment.paid,
          ]
        });
      }
    }
    
  }
  render(){
    return (
      <div className="App">
        <Header title={"ホーム"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
            <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={8} >
                <Paper style={{background:'#3f51b5'}}>
                  <PaperInner>
                    <Typography component="h2" variant="h6" color="inherit" noWrap style={{color:'white'}}>
                      検修状況
                    </Typography>
                    <div className="ens">
                      <InspectionData label={"下書き"} count={this.state.count[2]}/>
                      <InspectionData label={"未検修"} count={this.state.count[0]}/>
                      <InspectionData label={"再提出"} count={this.state.count[1]}/>
                      <InspectionData label={"完成（今月）"} count={this.state.count[3]}/>
                      <InspectionData label={"完成（累計）"} count={this.state.count[4]}/>
                    </div>
                    <p className="sub" style={{color:'white'}}>表示されているデータは現時点までのデータとなります。</p>
                  </PaperInner>
                  
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={4 } >
                <Paper>
                  <PaperInner>
                    <Typography component="h2" variant="h6" color="inherit" noWrap>
                      お支払い
                    </Typography>
                    <div className="ens">
                      <PaymentData label={"未確定"} count={this.state.payment[0]}/>
                      <PaymentData label={"確定済み"} count={this.state.payment[1]}/>
                      <PaymentData label={"支払い済み"} count={this.state.payment[2]}/>
                    </div>
                    <p className="sub">お支払いは変更される場合があります。</p>
                  </PaperInner>
                  
                </Paper>
              </Grid>
              {/*
              <Grid item xs={12} md={8} lg={5} >
                <Typography component="h2" variant="h6" color="inherit" noWrap>
                  執筆可能記事
                </Typography>
                <Paper>
                  <List component="nav" aria-label="secondary mailbox folder">
                      <ListItem button>
                        <ListItemText primary="Trash" />
                      </ListItem>
                      <ListItem button>
                        <ListItemText primary="Spam" />
                      </ListItem>
                    </List>
                </Paper>
              </Grid>
              */}
              <Grid item xs={4}>
                <Typography component="h2" variant="h6" color="inherit" noWrap>
                  記事単価
                </Typography>
                <Table 
                  label={["記事の種類","文字単価","最大"]}
                  rows={this.state.unitPrice}
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

const InspectionData = (props) => {
  return(
    <Inspection>
      <p className="label">{props.label}</p>
      <p className="data"><span className="count">{props.count}</span><span className="unit">記事</span></p>
    </Inspection>
  )
}
const PaymentData = (props) => {
  return(
    <Payment>
      <p className="label">{props.label}</p>
      <p className="data"><span className="count">￥{props.count}</span></p>
    </Payment>
  )
}


const PaperInner = styled.div`
  padding:10px 20px;
  
  .ens{
    width:100%;
    padding:15px 0;
    display:flex;
    justify-content:space-between;
  }
  .sub{
    padding:0;
    margin:0;
    line-height:1.5em;
    font-size:0.9em;
    color:#aaa;
  }
`
const Inspection = styled.div`
  padding:0 10px 0 0;
  width:100px;
  p{
    padding:0;
    margin:0;
    line-height:1.5em;
    color:white;
  }
  .label{
    font-weight:bold;
    padding-bottom:3px;
  }
  .data{
    .count{
      display:inline-block;
      padding-right:5px;
      font-size:1.5em;
    }
    .unit{
      font-size:0.8em;
    }
  }
`
const Payment = styled.div`
  padding:0 10px 0 0;
  width:100px;
  p{
    padding:0;
    margin:0;
    line-height:1.5em;
  }
  .label{
    font-weight:bold;
    padding-bottom:3px;
  }
  .data{
    .count{
      display:inline-block;
      padding-right:5px;
      font-size:1.5em;
    }
    .unit{
      font-size:0.8em;
    }
  }
`

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