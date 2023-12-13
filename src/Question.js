import React  from 'react';
import StatementBlock from './StatementBlock';
import AnswerBlock from './AnswerBlock';

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
          <AnswerBlock question={question} onWin={onWin} onLose={onLose} />
        </center>
      </div>
    </div>
  );
}

export default Question;