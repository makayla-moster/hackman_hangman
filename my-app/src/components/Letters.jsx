import React from 'react';
import styled from 'styled-components';

const Block = styled.ul`
  padding: 0;
  display ${props => (props.newGame ? 'block' : 'none')};
  list-style-type: none;
  margin: 5px 0;
  li {
    cursor: pointer;
    margin-right 12px;
    padding: 1px;
    text-transform: uppercase;
    font-size: 22px;
    display: inline-block;
  }
  li[disabled] {
    text-decoration: line-through;
    opacity: 0.4;
    pointer-events: none;
  }`;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Letters = props => (
  <div>
    <Block {...props}>
      {letters.map(letter => (
        <li
          key={letter}
          className = "letter"
          disabled={props.guesses.includes(letter) ? true : false}
          onClick={props.onClick}
          >
          {letter}
        </li>
      ))}
    </Block>
  </div>
);

export default Letters;
