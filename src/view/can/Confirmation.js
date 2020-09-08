import React from "react";
import styled from "styled-components";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button'


function Index (props){
  return(
    <Container maxWidth="lg">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={8} lg={8}>
          <Paper elevation={3} style={{padding:'20px'}}>
            <Typography component="h2" variant="h6" color="inherit" noWrap>
              注意事項
            </Typography>
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary={"この記事の最低文字数は、"+props.count+ "文字です。"+props.count+ "文字以下の記事は提出できませんので、ご注意ください。"}/>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary={"下の「執筆を開始する」ボタンを押した時点で、自動的に"+ localStorage.getItem("email") + "さんに依頼がアサインされます。"}/>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary={"納期は下の「執筆を開始する」ボタンを押した時点から24時間です。24時間以内に、完成原稿を提出してください。納期を過ぎた場合は、契約内容に則って契約解除となります。ただし、特別な事情が生じた場合は納期前に「uiljpfs4fg5hsxzrnhknpdqfx@gmail.com」までご連絡ください。その場合は納期を延長させていただきます。"}/>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText primary={"記事は文字を打つのをやめてから数秒後に自動的に下書きに保存されますが、お使いのブラウザの設定やバージョン等の影響や通信環境によっては、自動で保存されない場合があります。"}/>
              </ListItem>
            </List>
            <div style={{display:'flex',justifyContent:'center',padding:'20px'}}>
              <Button variant="contained" style={{margin:'0 10px'}} onClick={() => props.change(0,0,0)}>キャンセル</Button>
              <Button variant="contained" color="primary" style={{margin:'0 10px'}} onClick={() => props.assign()}>
                  執筆を開始する
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}


const styles={
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}
export default styled(Index)``;