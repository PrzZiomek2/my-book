import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


interface ModalDialogProps{
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   handleConfirm: Function;
   title: string;
   children: React.ReactNode;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open, 
  setOpen, 
  handleConfirm, 
  title, 
  children
}) => {

  const handleClose = () => {
    handleConfirm()
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle 
          sx={{ 
            m: 0, 
            p: 2,
            textAlign: "center"
          }} 
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent 
          dividers
          sx={{ padding: "20px 30px" }}
        >
          {children}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleConfirm()}>
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
