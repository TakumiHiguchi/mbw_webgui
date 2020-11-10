import React, { Children } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Container from '@material-ui/core/Container';

function Defaulttemplate(props){
  return(
    <div className="App">
      <Header handleSidebar={() => this.handleSidebar()} {...props}/>
      {props.is_signined ?
        <SinginedBody {...props} />
        :
        <NoSinginedBody {...props} />
      }
    </div>
  )
}

const SinginedBody = (props) => {
  return(
    <MainRoot>
      <Sidebar isOpen />
      <Main style={styles.main}>
        <Container maxWidth="lg">
          {props.children}
        </Container>
      </Main>
    </MainRoot>
  )
}

const NoSinginedBody = (props) => {
  return(
    <MainRoot>
      <NoSinginedMain style={styles.main}>
        <Container maxWidth="lg">
          {props.children}
        </Container>
      </NoSinginedMain>
    </MainRoot>
  )
}

const NoSinginedMain = styled.main`
  width:100%;
  padding-top:20px;
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

export default withRouter(styled(Defaulttemplate)``);