import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginTop:'10px',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 8px)',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const [tag, setTag] = React.useState("");

  const addTag = () => {
    props.addTag(tag)
    setTag("")
  }
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="タグを追加"
        inputProps={{ 'aria-label': 'タグを追加' }}
        onChange={(e) => setTag(e.target.value)}
        value={tag}
      />
      <input type="text" name="dummy" style={{display:'none'}} />
      <IconButton className={classes.iconButton} aria-label="search" onClick={() => addTag()}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
}