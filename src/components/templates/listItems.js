import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DoneIcon from '@material-ui/icons/Done';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  Link,
  withRouter
} from "react-router-dom";

function ListItems(props){
  const signout = () =>{
    props.history.push('/signin')
    localStorage.clear()
  }
  return(
    <div>
      <Link to={"/"} style={{display:'block',textDecoration:'none',color:'#000000'}}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="ホーム" />
        </ListItem>
      </Link>
      <Link to={"/can"} style={{display:'block',textDecoration:'none',color:'#000000'}}>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="執筆可能記事" />
        </ListItem>
      </Link>
      <Link to={"/written"} style={{display:'block',textDecoration:'none',color:'#000000'}}>
        <ListItem button>
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText primary="執筆済み記事" />
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="お問い合わせ" />
      </ListItem>
      <Divider />
        {localStorage.getItem("email") == "uiljpfs4fg5hsxzrnhknpdqfx@gmail.com" &&
          <>
            <Link to={"/planregist"} style={{display:'block',textDecoration:'none',color:'#000000'}}>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="登録予定者" />
              </ListItem>
            </Link>
            <Link to={"/assignment"} style={{display:'block',textDecoration:'none',color:'#000000'}}>
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="記事を依頼" />
              </ListItem>
            </Link>
          </>
        }
        
      <Divider />
      <ListItem button onClick={() => signout()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="サインアウト" />
      </ListItem>
    </div>
  );
}

export default withRouter(ListItems)