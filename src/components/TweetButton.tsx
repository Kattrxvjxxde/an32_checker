import React from 'react';
import {
  makeStyles,
  Box,
  Button,
} from "@material-ui/core";
import {
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const useStyles = makeStyles(() => ({
  tweetButtonBox: {
    margin: '1rem 0',
  },
  tweetButtonButton: {
    borderColor: '#00aced',
    backgroundColor: '#00aced',
    color: '#fff',
    transition: '0.5s',
    "&:hover": {
      color: '#00aced',
      transition: '0.5s',
    },
  },
  tweetButton: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '0.4rem',
  }
}));

type TweetButtonProps = {
  bpm: number,
  noteType: number,
  criticalSec: number;
};

const TweetButton: React.FC<TweetButtonProps> = (props: TweetButtonProps) => {
  const classes = useStyles();
  const { bpm, noteType, criticalSec } = props;

  const noteTypeText = noteType === 1 ? "全音符" : `${noteType}分音符`

  let tweetText = "";
  if (criticalSec > 0) {
    tweetText = `「BPM${bpm}」の「${noteTypeText}」を餡蜜するときに、CRITICAL判定で光る範囲は『${criticalSec}』ミリ秒あります。`;
  } else {
    tweetText = `「BPM${bpm}」の「${noteTypeText}」は、餡蜜してもCRITICAL判定で光りません。`;
  }

  return (
    <Box className={classes.tweetButtonBox}>
      <Button
        variant="outlined"
        className={classes.tweetButtonButton}
      >
        <TwitterShareButton
          title={tweetText}
          url={`https://kattrxvjxxde.github.io/an32_checker/?bpm=${bpm}&noteType=${noteType}`}
          hashtags={['SDVX餡蜜チェッカー']}
          className={classes.tweetButton}
        >
          <TwitterIcon size={24} round className={classes.icon} /> 結果をツイート
        </TwitterShareButton>
      </Button>
    </Box>
  );
};

export default TweetButton;
