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
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Form from "../form/addTagForm";


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

const tagContainer={
  display:'inline-block',
  background:'#00aced',
  borderRadius:'5000px',
  padding:'3px 15px',
  margin:'10px 10px 0px 0',
  height:'1.2em',
  color:'white',
  lineHeight:'1.2em'
}

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
  const [description, setDescription] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [tags, setTagsData] = React.useState([]);
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleChange = (value) =>{
    setDescription(value)
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const addTag = (tag) =>{
    if(tag != ""){
      let ins = [...tags, tag]
      setTagsData(ins)
    }
  }
  const handleSubmit = () =>{
    props.submit(
      description,
      Math.floor( selectedDate.getTime() / 1000 ),
      tags
    )
  }
  return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.isOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          詳細設定
        </DialogTitle>
        <DialogContent dividers style={{width:'500px',paddingTop:0}}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="flex-jus-around" style={{margin:'10px 0'}}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="公開日"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                style={{width:'45%'}}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="公開時間"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
                style={{width:'45%'}}
              />
            </div>
          </MuiPickersUtilsProvider>
          <TextField 
              id="outlined-multiline-static"
              label="ディスクリプションを入力"
              multiline
              fullWidth
              rows={4}
              value={description}
              variant="outlined"
              onChange={(e) => handleChange(e.target.value)}
          />
          <Form addTag={(tag) => addTag(tag)}/>
          {tags.map((d) =>
            <div style={tagContainer}># {d}</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleSubmit()} color="primary">
            記事を公開する
          </Button>
        </DialogActions>
      </Dialog>
  );
}