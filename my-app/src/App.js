import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show} from './helpers/helpers';
import randomWord from './pirateWords';
// import getWord from './fetchWord';

import './App.css';

// async function getWord(){
//   let response = await ( await fetch(`https://clemsonhackman.com/api/word?key=${process.env.REACT_APP_API_KEY}`)).json();
//   // return await fetch(`https://clemsonhackman.com/api/word?key=${process.env.REACT_APP_API_KEY}`)
//   //   .then(res => res.json())
//   //   .then((out) => {
//   //       out = JSON.stringify(out['word']);
//   //       console.log('Output: ', out);
//   //     }).catch(err => console.error(err));
//   console.log("Word: ",  response);
//   // return words
//   // return response;
//   return response['word'];
// }
//
// let selectedWord = getWord();
// console.log("Word2: ",  selectedWord);
// var wordAPI = `https://clemsonhackman.com/api/word?key=${process.env.REACT_APP_API_KEY}`;

let selectedWord = randomWord();
// let selectedWord = getWord();
function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  // const [selectedWord, setWord] = useState(null);
  // const formatResponse = (res) => {
  //   console.log("Res ", JSON.stringify(res['word']));
  //   return JSON.stringify(res['word']);
  // }

  // async function getWords(){
  //   try {
  //     const res = await fetch(`https://clemsonhackman.com/api/word?key=${process.env.REACT_APP_API_KEY}`);
  //       if (!res.ok) {
  //         const error = `An error has occured: ${res.status} - ${res.statusText}`;
  //         console.log(error);
  //       }
  //       const data = await res.json();
  //       // const result = {
  //       //   word: data
  //       // };
  //       setWord(formatResponse(data));
  //   } catch(err) {
  //     setWord(err.message);
  //   }
  // }
  // setWord([]);
  // console.log(selectedWord);
  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);
    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);
    // const random = Math.floor(Math.random() * words.length);
    // selectedWord = words[random];
    selectedWord = randomWord();
    // selectedWord = getwordsfromapi();
    // let selectedWord = getWord();
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
