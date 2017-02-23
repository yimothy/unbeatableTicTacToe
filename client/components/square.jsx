import React from 'react';

export default function Square(props) {
  const index = props.index;
  console.log('INDEX: ', index)
  const style = {
    width: '30px',
    height: '30px',
    border: '2px solid black',
  }
  return (
    <div style={style} onClick={() => props.onClick()}>
      {props.value}
    </div>
  );
}
