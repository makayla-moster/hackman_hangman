import React from 'react';
import styled from 'styled-components';
import png1 from '../img/Landing_Page.png';
import png2 from '../img/Wrong_1.png';
import png3 from '../img/Wrong_2.png';
import png4 from '../img/Wrong_3.png';
import png5 from '../img/Wrong_4.png';
import png6 from '../img/Wrong_5.png';
import png7 from '../img/Wrong_6.png';
import png8 from '../img/Wrong_7.png';
import png9 from '../img/Wrong_8.png';

const Wrapper = styled.div`
  width: 295px;
  height: 295px;
  background: url(${png1}) no-repeat center center;
  background-size: 100%;
  margin: 0 15px;
  display: ${props => (props.newGame ? 'block' : 'none')};
  opacity: ${props => (props.newGame ? 1 : 0)};
  transition: all 0.5s linear;
  &[data-order='2'] {
    background-image: url(${png2})
  }
  &[data-order='3'] {
    background-image: url(${png3})
  }
  &[data-order='4'] {
    background-image: url(${png4})
  }
  &[data-order='5'] {
    background-image: url(${png5})
  }
  &[data-order='6'] {
    background-image: url(${png6})
  }
  &[data-order='7'] {
    background-image: url(${png7})
  }
  &[data-order='8'] {
    background-image: url(${png8})
  }
  &[data-order='9'] {
    background-image: url(${png9})
  }
`;

const Gallows = props => (
  <Wrapper {...props} data-order={props.currentDiagram} className="diagram" />
);

export default Gallows;
