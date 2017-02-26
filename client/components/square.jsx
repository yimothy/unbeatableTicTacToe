import React from 'react';

export default function Square(props) {
  const style = {
    width: '10vw',
    height: '10vw',
    border: '2px solid black',
    float: 'left',
    fontSize: '9vw',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
  };
  return (
    <div style={style} onClick={() => props.onClick()}>
      {props.value}
    </div>
  );
}
