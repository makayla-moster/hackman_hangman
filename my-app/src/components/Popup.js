import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';
import pngW from '../imgs/Win.png';
import pngL from '../imgs/Lose.png';

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;
  let image = '';

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = "Yarr! Ye saved the cap'n!";
    image = pngW;
    playable = false;
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = "The cap'n has been sent to Davy Jones' locker...";
    image = pngL;
    finalMessageRevealWord = `The lost booty was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <img src={image} height={600} width={600} />
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default Popup
