import React from 'react';

export default function Square(props) {
  const style = {
    width: '10vw',
    height: '10vw',
    border: '2px solid #dae5bc',
    backgroundColor: 'white',
    float: 'left',
    fontSize: '8vw',
    textAlign: 'center',
    fontFamily: 'Nunito, sans-serif',
  };
  return (
    <div style={style} onClick={() => props.onClick()}>
      {props.value}
    </div>
  );
}

Square.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
  ]),
};
