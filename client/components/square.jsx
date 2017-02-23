import React from 'react';

export default function Square(props) {
  const style = {
    width: '30px',
    height: '30px',
    border: '2px solid black',
  }
console.log(props)
  return (
    <div style={style}>
      <div>{props.value}</div>
    </div>
  );
}
