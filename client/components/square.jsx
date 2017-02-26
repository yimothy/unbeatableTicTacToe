import React from 'react';

export default function Square(props) {
  const styles = {
    winner: {
      width: '10vw',
      height: '10vw',
      border: '2px solid #dae5bc',
      backgroundColor: '#97d87d',
      float: 'left',
      fontSize: '8vw',
      textAlign: 'center',
      fontFamily: 'Nunito, sans-serif',
    },
    normal: {
      width: '10vw',
      height: '10vw',
      border: '2px solid #dae5bc',
      backgroundColor: 'white',
      float: 'left',
      fontSize: '8vw',
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

// Square.propTypes = {
//   value: React.PropTypes.oneOfType([
//     React.PropTypes.string,
//   ]),
// };
