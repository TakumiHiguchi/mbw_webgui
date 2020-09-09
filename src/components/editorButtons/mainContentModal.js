import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});



const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [lyrics, setLyrics] = React.useState("");
  const handleClose = (type) => {
    props.close(type,lyrics);
  };
  const handleChange = (value) =>{
    setLyrics(value)
  }
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">歌詞を追加</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleClose(false)}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  return (
    <div>
      <Dialog onClose={() => handleClose(false)} aria-labelledby="customized-dialog-title" open={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom style={{width:'500px',marginBottom:'20px'}}>
            歌詞は節ごと追加してください。
          </Typography>
          <TextField
            id="outlined-multiline-static"
            label="歌詞を入力"
            multiline
            fullWidth
            rows={4}
            value={lyrics}
            variant="outlined"
            onChange={(e) => handleChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleClose(true)} color="primary">
            歌詞を追加する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}