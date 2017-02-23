import React from 'react';

export default function Square(props) {
  const index = props.index;

  const style = {
    width: '150px',
    height: '150px',
    border: '2px solid black',
    float: 'left',
  }
  return (
    <div style={style} onClick={() => props.onClick()}>
      {props.value}
    </div>
  );
}
