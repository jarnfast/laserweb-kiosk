import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { ReactElement, FC } from "react";

interface DialogProps {
  handleConfirm: any;
  handleCancel: any;
  title: string;
  content: string;
  open: boolean;
}

const DialogConnecting: FC<DialogProps> = ({
  handleConfirm,
  handleCancel,
  title,
  content,
  open,
}): ReactElement => {
  const handleClose = () => {
    console.log("DialogConfirm closed");
  };

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogConnecting;
