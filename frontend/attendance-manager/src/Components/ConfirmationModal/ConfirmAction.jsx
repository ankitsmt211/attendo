import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmAction({ status, setStatus, actionConfirmation }) {
  const handlePrimary = async () => {
    const success = await actionConfirmation.action();
    if (success) {
      setStatus((prev) => !prev);
    } else {
      alert('unable to do primary action');
    }
  };

  const handleSecondary = () => {
    setStatus((prev) => !prev);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={status}
        TransitionComponent={Transition}
        onClose={handleSecondary}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{actionConfirmation.modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{actionConfirmation.modalText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrimary}>{actionConfirmation.primaryButton}</Button>
          <Button onClick={handleSecondary}>{actionConfirmation.secondaryButton}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

ConfirmAction.propTypes = {
  status: PropTypes.bool,
  setStatus: PropTypes.func,
  actionConfirmation: PropTypes.func,
};
