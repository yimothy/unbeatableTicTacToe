import React from 'react';

export default function Square(props) {
  const style = {
    width: '15vw',
    height: '15vw',
    border: '2px solid black',
    float: 'left',
    fontSize: '14vw',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
  };
  return (
    <div style={style} onClick={() => props.onClick()}>
      {props.value}
    </div>
  );
}
