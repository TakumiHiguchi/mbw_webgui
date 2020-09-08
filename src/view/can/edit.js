import React from "react";
import axios from "axios";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Editor from "../../components/Editor";

import styled from "styled-components";
import { withRouter,useParams } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



class Edit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isSidebar:true,
      mainInsCont:'',
      
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  handleOnChange(val){
    this.setState({mainInsCont:val})
  }
  render(){
    const {key} = this.props.match.params
    return (
      <div className="App">
        <Header title={"執筆可能記事"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={12} >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    name="artist"
                    label="アーティスト"
                    type="text"
                    id="artist"
                    style={{margin:'0 15px 0 0'}}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    name="musicTitle"
                    label="曲名"
                    type="text"
                    id="musicTitle"
                    style={{margin:'0 15px 0 0'}}
                />
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
                  <Editor 
                    change={(val) => this.handleOnChange(val)}
                    Dom={this.state.mainInsCont}
                    htmlIns={""}
                  />
                </Card>
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
export default withRouter(styled(Edit)``);