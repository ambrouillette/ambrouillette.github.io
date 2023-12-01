import React, { useState }  from 'react';
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

const AnswerBlock = ({ nbChoices, text, isAnswer, onLose, onWin }) => {

  const [state, setState] = useState('');

  return (
    <div style={{ 
      display: 'inline-block', 
      minWidth: '200px',
      width: 600 / nbChoices,
      marginLeft: 7,
      marginRight: 7,
      marginBottom: 10,
      marginTop: 10,
    }}>
      <div 
        style={{
          border: '1px solid gray',
          borderRadius: 10,
          paddingTop: 8,
          paddingBottom: 8,
          background: state === 'win' ? (
            'lime' 
          ) : state === 'lose' ? (
            'red'
          ) : '#FCFCFC',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (isAnswer) {
            if (state !== 'win') {
              setState('win');
              onWin();  
            }
          } else {
            if (state !== 'lose') {
              setState('lose');
              onLose();
            }
          }
        }}
      >
        <center>
          <h1 style={{ 
            fontSize: 42, 
            marginTop: 0, 
            marginBottom: 0 
          }}>
            {text}
          </h1>
        </center>
      </div>
    </div>
  )
}


const Question = ({ question, onWin, onLose, context }) => {
  return (
    <div key={question.id}>
      <div>
        <center>
          <StatementBlock statement={question.statement} context={context} />
        </center>
      </div>
      
      <div 
        style={{ paddingTop: '6vh' }}
      >
        <center>
          <div style={{ width: '100%' }}>
            {question.answers.map((answer) => (
              <AnswerBlock 
                key={answer.text}
                nbChoices={question.answers.length}
                text={answer.text} 
                isAnswer={answer.isAnswer}
                onWin={onWin} 
                onLose={onLose}
              />
            ))}
          </div>
        </center>
      </div>
    </div>
  );
}

export default Question;