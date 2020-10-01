import React from 'react';
import Header from "../Header";
import Sidebar from "../Sidebar";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

function PageTemplate({title,children}) {
  return (
    <div className="App">
      <Header title={title} handleSidebar={() => this.handleSidebar()}/>
      <MainRoot>
        <Sidebar isOpen={true} />
        <Main className="scroll-y">
          {children}
        </Main>
      </MainRoot>
    </div>
  );
}

const MainRoot = styled.div`
  display:flex;
  padding-top:64px;
  height:calc(100vh - 64px)
`
const Main = styled.main`
  width:100%;
  height:calc(100% - 20px);
  padding-top:20px;
`

export default withRouter(styled(PageTemplate)``);