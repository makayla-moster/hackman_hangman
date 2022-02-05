import React from 'react'
import png1 from '../imgs/Landing_Page.png'
import png2 from '../imgs/Wrong_1.png'
import png3 from '../imgs/Wrong_2.png'
import png4 from '../imgs/Wrong_3.png'
import png5 from '../imgs/Wrong_4.png'
import png6 from '../imgs/Wrong_5.png'
import png7 from '../imgs/Wrong_6.png'
import png8 from '../imgs/Wrong_7.png'
import png9 from '../imgs/Wrong_8.png'


const Figure = ({ wrongLetters }) => {
  const errors = wrongLetters.length
  if (errors == 0){
    return <img src={png1} height={600} width={600} />
  }
  else if (errors == 1) {
    return <img src={png2} height={600} width={600} />
  }
  else if (errors == 2) {
    return <img src={png3} height={600} width={600} />
  }
  else if (errors == 3) {
    return <img src={png3} height={600} width={600} />
  }
  else if (errors == 4) {
    return <img src={png4} height={600} width={600} />
  }
  else if (errors == 5) {
    return <img src={png5} height={600} width={600} />
  }
  else if (errors == 6) {
    return <img src={png6} height={600} width={600} />
  }
  else if (errors == 7) {
    return <img src={png7} height={600} width={600} />
  }
  else if (errors == 8) {
    return <img src={png8} height={600} width={600} />
  }
  else if (errors == 9) {
    return <img src={png9} height={600} width={600} />
  }
}

export default Figure
