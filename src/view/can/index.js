import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Index (props){
  return(
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={6} >
          <Typography component="h2" variant="h6" color="inherit" noWrap>
            歌詞解釈記事
          </Typography>
          <Paper>
            <List component="nav" aria-label="secondary mailbox folder">
              {props.data.map((d) => 
                <>
                  {d[1] === 0 &&
                    <ListItem button onClick={() => props.change(1,d[4],d[3])}>
                      <ListItemText primary={d[0]+ '（最低文字数: ' + d[3] +'文字）'} />
                    </ListItem>
                  }
                </>
              )}
              {props.data.length === 0 &&
                <ListItem>
                  <ListItemText primary={'依頼がありません。依頼が公開されるまでお待ちください。'} />
                </ListItem>
              }
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={6} >
          <Typography component="h2" variant="h6" color="inherit" noWrap>
            特集記事
          </Typography>
          <Paper>
            <List component="nav" aria-label="secondary mailbox folder">
              {props.data.map((d) => 
                <>
                  {d[1] === 1 &&
                    <ListItem button onClick={() => props.change(1,d[4],d[3])}>
                      <ListItemText primary={d[0] + '（最低文字数: ' + d[3] +'文字）'} />
                    </ListItem>
                  }
                </>
              )}
              {props.data.length === 0 &&
                <ListItem>
                  <ListItemText primary={'依頼がありません。依頼が公開されるまでお待ちください。'} />
                </ListItem>
              }
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
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
export default withRouter(styled(Index)``);