import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import { ReactElement, FC } from "react";

interface DialogProps {
  handleCancel: any;
  open: boolean;
}

const DialogConnecting: FC<DialogProps> = ({
  handleCancel,
  open,
}): ReactElement => {
  const handleClose = () => {
    console.log("handleClose");
  };

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle>Connecting .. </DialogTitle>
      <DialogContent>
        <LinearProgress variant="indeterminate" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogConnecting;
