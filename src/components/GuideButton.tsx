import React from 'react';
import {
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dialogContentText: {
    fontSize: '0.8rem',
  },
  exampleText: {
    margin: '0 0.3rem',
    fontSize: '0.6rem',
    border: '0.1rem solid #dcdcdc',
    padding: '0.3rem',
  },
}));

const GuideButton: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button
        color="inherit"
        variant="outlined"
        onClick={handleOpen}
      >
        使い方
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className={classes.dialogContentText}
          >
            <h3>使い方</h3>
            <p>① 確認したい譜面の「BPM」と「NOTE TYPE」を入力します。</p>
            <p className={classes.exampleText}>
              例）Divine's:Bugscript の速いトリル<br />
              　⇒　「BPM」→ 230, <br />
              　　　「NOTE TYPE」→ 24（分音符）
            </p>
            <p>② 計算結果を確認します。</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GuideButton;
