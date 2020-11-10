import React from 'react';
import 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
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
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = () =>{
    let blob = new Blob([props.content],{type:"text/plan"});
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16)))) + '.branchwith';
    link.click();
  }
  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.isOpen}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        執筆ありがとうございました。
      </DialogTitle>
      <DialogContent dividers style={{width:'500px'}}>
        以下の記事をダウンロードするというボタンから、ファイルをダウンロードして提出してください。
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleSubmit()} color="primary">
          記事をダウンロードする
        </Button>
      </DialogActions>
    </Dialog>
  );
}