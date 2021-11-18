import React from 'react';
import {
  makeStyles,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import Img24to16_1 from '../images/24to16_1.jpg'
import Img24to16_2 from '../images/24to16_2.jpg'

const useStyles = makeStyles(() => ({
  buttonBox: {
    margin: '0 2rem 0.7rem 2rem',
    textAlign: 'right',
  },
  buttonText: {
    fontSize: '0.7rem',
  },
  dialogContentText: {
    fontSize: '0.8rem',
  },
  exampleText: {
    margin: '0 0.3rem',
    fontSize: '0.7rem',
    border: '0.1rem solid #dcdcdc',
    padding: '0.4rem',
    textAlign: 'center',
  },
  img: {
    width: '16rem',
  },
}));

type SupplementButtonProps = {
  display: boolean;
}

const SupplementButton: React.FC<SupplementButtonProps> = (props: SupplementButtonProps) => {
  const classes = useStyles();
  const { display } = props;

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
    <Box className={classes.buttonBox}>
      <Button
        className={classes.buttonText}
        color="primary"
        variant="outlined"
        onClick={handleOpen}
        style={{ visibility: display ? 'visible' : 'hidden' }}
      >
        ※ 24分を16分に変換とは？
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="supplement-dialog-title"
        aria-describedby="supplement-dialog-description"
      >
        <DialogTitle id="supplement-dialog-title">
          24分を16分に変換とは？
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="supplement-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className={classes.dialogContentText}
          >
            <p>
              24分のノーツというのは、0.5拍の間に均等に3個のノーツが存在するものです。<br />
              その3個のノーツのうち、2個目と3個目を中央で餡蜜すると、<br />
              1個目のノートと2個目・3個目との間隔がちょうど16分と同じになります。
            </p>
            <p className={classes.exampleText}>
              <img className={classes.img} src={Img24to16_1} alt="Img24to16_1" />
            </p>
            <p>
              また、少しテクニカルにはなりますが、<br />
              24分の隣接したレーンのトリルでも同様の餡蜜が可能です。
            </p>
            <p className={classes.exampleText}>
              <img className={classes.img} src={Img24to16_2} alt="Img24to16_2" />
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

SupplementButton.defaultProps = {
  display: true,
};

export default SupplementButton;
