import React from 'react';
import DiceFace from './DiceFace';
import Vocal from './Vocal';

const StatementBlock = ({ statement, context }) => {

  if (statement.type === 'text') {
    return (
      <h1 
        style={{ 
          marginTop: 0,
          marginBottom: '4vh',
          fontSize: '3em',
          color: 'darkblue',
        }}>
        {statement.text}
      </h1>
    );
  }

  if (statement.type === 'dices') {
    return (
      <div>
        {statement.numbers.map((number, index) => (
          <div key={index} style={{ display: 'inline-block', margin: 10 }}>
            <DiceFace number={number} />
          </div>
        ))}
      </div>
    )
  }

  if (statement.type === 'vocal') {
    return (
      <div>
        <Vocal text={statement.text} context={context} />
      </div>
    )
  }
  
  return null;
}

export default StatementBlock;