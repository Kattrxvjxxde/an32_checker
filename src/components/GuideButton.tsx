import React from 'react';
import {
  makeStyles,
  Button,
  Link,
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
    fontSize: '0.7rem',
    border: '0.1rem solid #dcdcdc',
    padding: '0.4rem',
  },
  hr: {
    margin: '1.2rem 0.2rem',
  },
  sectionLabel: {
    margin: '0',
  },
  section: {
    margin: '0 0.8rem',
  },
  tips: {
    fontSize: '0.4rem',
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
            <h2>はじめに</h2>
            <p>
              このツールは、難しい譜面の<b>PUC</b>を狙うSOUND VOLTEX上級者をターゲットして作成しています。<br />
              譜面のクリアや、ある程度の高スコアを狙う人に向けたものではない点、ご了承ください。
            </p>

            <hr className={classes.hr} />

            <h2>使い方</h2>
            <h4 className={classes.sectionLabel}>【STEP 1】</h4>
            <div className={classes.section}>
              <p>
                速いノーツを同時押し（以下、餡蜜と言います）したら、どの程度CRITICAL判定で光るのかどうかを確認したい譜面を見つけます。<br />
                その譜面の<b>BPM</b>と<b>NOTE TYPE</b>を入力します。
              </p>
              <p className={classes.exampleText}>
                例）Divine's:Bugscript の2回出てくる速いトリル（24分）<br />
                　⇒　BPM → 230<br />
                　　　NOTE TYPE → 24（分音符）
              </p>
              <p><b>BPM</b>は数字3桁まで、<b>NOTE TYPE</b>は数字2桁まで、それぞれ入力できます。</p>
            </div>

            <h4 className={classes.sectionLabel}>【STEP 2】</h4>
            <div className={classes.section}>
              <p>計算結果を確認します。</p>
              <p className={classes.section}>
                <b>ノーツ間秒数</b> ... 餡蜜したいノーツの1つ目と2つ目の間隔の秒数（ms）<br />
                <b>CRITICAL範囲</b> ... 同時押しした場合にCRITICAL判定となる範囲の秒数（ms）
                <p className={classes.tips}>
                  ※ 単一ノートのCRITICAL判定は、120fpsを前提としてノートの前後それぞれ5フーレム分 = 41.667ms で計算をしています。
                </p>
              </p>
              <p>
                餡蜜が有効であるかの判断は、<b>CRITICAL範囲</b>の値を参考にするのがおすすめです。<br />
                <b>CRITICAL範囲</b>の値が存在すれば、<b>"理論的"には餡蜜で光る</b>はずです。
              </p>
              <p>
                計算結果に基づき、製作者の考察コメントが表示されます。参考程度にご覧ください。<br />
                尚、<b>NOTE TYPE</b>が<b>24</b>で指定されている場合にのみ表示されるコメントがあります。
              </p>
            </div>
            <h4 className={classes.sectionLabel}>【STEP 3】</h4>
            <div className={classes.section}>
              <p>イメージ図を確認します。<br />ただし厳密に正確な図ではないため、こちらはあくまで参考程度にご覧ください。</p>
            </div>

            <hr className={classes.hr} />

            <h2>備考</h2>
            <p>
              ・上記の使い方を見てご不明な点がある場合は、
              <Link href="https://twitter.com/waniroukun" underline="always" target="_blank" rel="noopener noreferrer">
                製作者
              </Link>
              にお尋ねください。
            </p>
            <p>
              ・具体的は計算式は下記の通りです。
            </p>
            <p className={classes.exampleText}>
              ノーツ間秒数 ⇒ 1000[ms] / ( BPM × ( NOTE TYPE/4 ) × (1/60) )<br />
              CRITICAL範囲 ⇒ 10フレーム【 10 × ( 1000[ms] / 120 ) 】 - ノーツ間秒数
            </p>
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
