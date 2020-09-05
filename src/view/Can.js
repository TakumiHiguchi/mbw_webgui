import React from "react";
import GenericTemplate from "../components/dashboard/Dashboard";
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

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isSidebar:true,
    }
  }
  handleSidebar(){
    this.setState({isSidebar:!this.state.isSidebar})
  }
  render(){
    return (
      <div className="App">
        <Header title={"執筆可能記事"} handleSidebar={() => this.handleSidebar()}/>
        <MainRoot>
          <Sidebar isOpen={this.state.isSidebar} />
          <Main style={styles.main}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={6} >
                  <Typography component="h2" variant="h6" color="inherit" noWrap>
                    歌詞解釈記事
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
                <Grid item xs={12} md={8} lg={6} >
                  <Typography component="h2" variant="h6" color="inherit" noWrap>
                    特集記事
                  </Typography>
                  <Paper>
                    <List component="nav" aria-label="secondary mailbox folder">
                        <ListItem button>
                          <ListItemText primary="米津玄師 - Lemonの歌詞解釈記事の作成（最低2000文字）" />
                        </ListItem>
                        <ListItem button>
                          <ListItemText primary="Spam" />
                        </ListItem>
                      </List>
                  </Paper>
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