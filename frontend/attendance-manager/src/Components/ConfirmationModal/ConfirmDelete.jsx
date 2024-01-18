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

  const handleDelete = async () => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:8080/api/v1/students/subjects/${currentSubject.subId}`

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept":"application/json"
        }
    })

    if(response.ok){
        const updatedSubjects = await response.json()

        setSubjects(updatedSubjects)
        if(updatedSubjects.length>0){
          setCurrentSubject(updatedSubjects[0])
        }
        else{
          setCurrentSubject('')
        }
        setStatus(prev=>!prev)
    }
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