import React from 'react';

export default function Square(props) {
  const styles = {
    winner: {
      width: '32%',
      height: '32%',
      border: '2px solid #dae5bc',
      backgroundColor: '#97d87d',
      float: 'left',
      fontSize: 'calc(50px + 4.5vw)',
      textAlign: 'center',
      fontFamily: 'Nunito, sans-serif',
    },
    normal: {
      width: '32%',
      height: '32%',
      border: '2px solid #dae5bc',
      backgroundColor: 'white',
      float: 'left',
      fontSize: 'calc(50px + 4.5vw)',
      textAlign: 'center',
      fontFamily: 'Nunito, sans-serif',
    },
  };
  const style = props.winningSquare ? styles.winner : styles.normal;
  return (
    <div style={style} onClick={() => props.onClick()}>
      {props.value}
    </div>
  );
}

Square.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  winningSquare: React.PropTypes.bool,
};
