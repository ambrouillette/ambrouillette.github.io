import React, { useEffect, useState }  from 'react';
import SortableList, { SortableItem } from 'react-easy-sort'
import './AnswerBlock.css';

const ChoiceBlock = ({ nbChoices, text, isAnswer, onLose, onWin }) => {

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

const SortingChallenge = ({ challenge, onWin }) => {
  const [items, setItems] = useState(challenge.items.map(item => item.text));
  const [hasWon, setHasWon] = useState(false);
  const [hasTriggerOnWin, setHasTriggerOnWin] = useState(false);

  const onSortEnd = (oldIndex, newIndex) => {
    setItems((array) => {
      const newArray = [...array];
      newArray.splice(oldIndex <= newIndex ? newIndex+1 : newIndex, 0, array[oldIndex]);
      newArray.splice(oldIndex <= newIndex ? oldIndex : oldIndex+1, 1);
      return newArray;
    });
  }

  useEffect(() => {
    const expectedResult = challenge.expectedOrder.map(i => challenge.items[i].text);
    if (expectedResult.join(';') === items.join(';')) {
      setHasWon(true);
    }
  },[items, challenge]);

  useEffect(() => {
    if (hasWon && !hasTriggerOnWin) {
      setHasTriggerOnWin(true);
      setTimeout(() => {
        console.log('ON WIN');
        onWin();
      }, 500);
    }
  }, [hasWon, onWin]);

  return (
    <center>
      <div className={hasWon ? 'sorting-challenge-won' : 'sorting-challenge-play' } style={{ width: 70*items.length }}>
        <SortableList
          onSortEnd={onSortEnd}
          className="sorting-challenge-list"
          draggedItemClassName="sorting-challenge-dragged"
          lockAxis="x"
        >
          {items.map((item) => (
            <SortableItem key={item}>
              <div className="sorting-challenge-item">{item}</div>
            </SortableItem>
          ))}
        </SortableList>
      </div>
    </center>
  );
}

const AnswerBlock = ({ question, onWin, onLose }) => {

  if (question.challenge.type === 'select') {
    return (
      <div style={{ width: '100%' }}>
        {question.challenge.choices.map((answer) => (
          <ChoiceBlock 
            key={answer.text}
            nbChoices={question.challenge.choices.length}
            text={answer.text} 
            isAnswer={answer.isAnswer}
            onWin={onWin} 
            onLose={onLose}
          />
        ))}
      </div>
    );
  }

  if (question.challenge.type === 'sorting') {
    return (
      <div style={{ width: '100%' }}>
        <SortingChallenge
          challenge={question.challenge}
          onWin={onWin}
        />
      </div>
    )
  }
}

export default AnswerBlock;