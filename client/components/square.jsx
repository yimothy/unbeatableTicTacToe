import React from 'react';

export default function Square(props) {
  const styles = {
    winner: {
      width: '32%',
      height: '32%',
      border: '2px solid #dae5bc',
      backgroundColor: '#97d87d',
      float: 'left',
      fontSize: '8vw',
      textAlign: 'center',
      fontFamily: 'Nunito, sans-serif',
    },
    normal: {
      width: '32%',
      height: '32%',
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
// <svg width="100%" height="100%" viewBox="0 0 13 15">
//   <text x="0" y="13">{props.value}</text>
// </svg>
// Square.propTypes = {
//   value: React.PropTypes.oneOfType([
//     React.PropTypes.string,
//   ]),
// };
