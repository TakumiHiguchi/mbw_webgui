import React from "react";
import styled from "styled-components";

import ListItem from "../components/templates/listItems";

//icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

//items
import { mainListItems, secondaryListItems } from './dashboard/listItems';

function Header(props) {
  return (
    <Sidebar style={props.isOpen ? styles.sideOpen : styles.sideClose}>
      <ListItem />
    </Sidebar>
  );
}
const Sidebar = styled.aside`
  padding-top:10px;
  overflow-x: hidden;
  white-space:nowrap;
`

const styles = {
  sideOpen:{
    width:'240px',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  },
  sideClose:{
    width:'70px',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  }
}
export default styled(Header)``;