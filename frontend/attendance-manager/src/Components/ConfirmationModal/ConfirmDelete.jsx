import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { currentSubjectContext } from '../Dashboard/Dashboard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDelete({status,setStatus,subjects,setSubjects}) {
  const [open, setOpen] = React.useState(false);
  const [currentSubject,setCurrentSubject] = React.useContext(currentSubjectContext)

  const handleDelete = () => {
    // setDeleteCurrentSubject(prev=>!prev)
    console.log("set delete value")

    let modifiedSubjectArray = []

    for(let sub of subjects){
      if(sub.name!==currentSubject.name){
        modifiedSubjectArray.push(sub)
      }
    }

    setSubjects([...modifiedSubjectArray])
    let modifiedCurrentSubject = {...modifiedSubjectArray[0]}
    console.log(modifiedCurrentSubject)
    setCurrentSubject(modifiedCurrentSubject)
    setStatus(prev=>!prev)
  };

  const handleClose = () => {
    setStatus(prev=>!prev)
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={status}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You are about to delete current subject, please confirm.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}