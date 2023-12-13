"use client";
import _ from 'underscore';
import React, { useState, useEffect }  from 'react';
import Confetti from 'react-confetti'
import { questions } from './questions';
import StarRatings from 'react-star-ratings';
import Question from './Question';
 
const MAX_LEVEL = 5;

const supriseLinks = [
  
  'https://media.tenor.com/4LVm1PEVIdwAAAAC/happy-fathers-day-hit.gif',
  'https://media.tenor.com/maoRNYFkhekAAAAd/drive-over-run-over.gif',
  'https://media.tenor.com/HPNeZ5MPqQEAAAAd/kids-funny-kids.gif',
  'https://media.tenor.com/bDqIPjjvAjcAAAAC/slide-slide-in.gif',
  'https://media.tenor.com/YueGTCQbCA8AAAAd/mosquito-amber.gif',
  'https://media.tenor.com/z2__vv21YrMAAAAC/fall-falling.gif',
  'https://media.tenor.com/nJP7ulH1lUYAAAAd/count-fail-epic-count-fail.gif',
  
  'https://media.tenor.com/G9zg9beK7R0AAAAd/cat-stairs-are-hard.gif',
  'https://media.tenor.com/y29IKgPqezcAAAAC/fml-done.gif',

  
  'https://media.tenor.com/mG2C4qgNU3EAAAAC/happy-birthday.gif',
  'https://media.tenor.com/7db7tpuWM9gAAAAC/pfsf1968.gif',
  'https://media.tenor.com/1Us4pAnPJhMAAAAd/cat-fail.gif',
  'https://media.tenor.com/nibGijNvmmEAAAAd/cat-jump.gif',
  'https://media.tenor.com/Z4MAwi2q9aQAAAAC/fall-tumble.gif',
  'https://media.tenor.com/HQEWEMDXR0YAAAAd/dog-scooter.gif',
  'https://media.tenor.com/Z4MAwi2q9aQAAAAC/fall-tumble.gif',
  'https://media.tenor.com/W2f5WvU-79IAAAAC/penguin-oops.gif',
  'https://media.tenor.com/8BEgH-dodr0AAAAd/penguin-slap.gif',
  'https://media.tenor.com/dDpwh1YBO9QAAAAC/funny-animals-cat.gif',
  'https://media.tenor.com/oIqV-QBY4ywAAAAd/funny-animals.gif',
  'https://media.tenor.com/DNhudyyDIukAAAAd/funny-animal.gif',
  'https://media.tenor.com/YxOpjAI-VCEAAAAd/funny-animals-jump-fail.gif',
  'https://media.tenor.com/TLpU76Jem_4AAAAC/squirrel-fail.gif',
  'https://media.tenor.com/YdoWqUTQx5UAAAAC/hamster-hamster-wheel.gif',
  'https://media.tenor.com/7yLeScrVvmcAAAAd/falling.gif',
  'https://media.tenor.com/TcqTnKToUL8AAAAC/cat-slide.gif',
  
];

const sampleOne = (arr) => {
  return _.shuffle(arr)[0];
}


const Game = () => {

  const [nbSolvedQuestions, setNbSolvedQuestions] = useState(0);
  const [level, setLevel] = useState(0);
  const [runId, setRunId] = useState('1');
  const [question, setQuestion] = useState();
  const [supriseLink, setSupriseLink] = useState('');
  const [targetTag, setTargetTag] = useState('multiplication'); 
  
  useEffect(()=> {

    let queryParamTags = null;
    const searchParams = new URLSearchParams((window.location.search || '').slice(1));
    for (const [key, value] of searchParams.entries()) {
      if (key === 'tags') {
        queryParamTags = value;
      }
    }

    if (!question) {
      const possibleTags = _.uniq(_.flatten(_.pluck(questions, 'tags')));
      const newTargetTag = queryParamTags ? queryParamTags : Math.random() < 0.5 ? _.shuffle(possibleTags)[0] : '';
      setTargetTag(newTargetTag);
      setQuestion(sampleOne(
        questions.filter(q => !targetTag || q.tags.includes(newTargetTag)).slice(0,7)
      ));
    }
  }, [question, targetTag])

  const onRestart = () => {
    setLevel(0);
    setRunId('' + Math.random());
    setQuestion(sampleOne(
      questions.filter(q => !targetTag || q.tags.includes(targetTag)).slice(0,7)
    ));
  }

  const onLose = () => {
    setLevel((level) => Math.max(0, Math.ceil(1*level)-1)/1);
  }

  const onWin = () => {
    setNbSolvedQuestions(v => v+1)
    const newLevel = Math.min(MAX_LEVEL, (Math.ceil(1*level)+1)/1);
    if (newLevel === MAX_LEVEL) {
      setSupriseLink(sampleOne(supriseLinks));
    }
    setLevel(newLevel);
    setTimeout(() => {
      const otherQuestions = questions.filter(
        ({ id, tags }) => id !== question.id && (!targetTag || tags.includes(targetTag))
      );
  
      const isSeenLevel = {};
      const availableLevels = [];
      for (const otherQuestion of otherQuestions) {
        if (!isSeenLevel[otherQuestion.level]) {
          isSeenLevel[otherQuestion.level] = true;
          const mappedLevel = 3*(level/MAX_LEVEL) + 1;/*-0.2*/;
          const diff = Math.abs(mappedLevel - otherQuestion.level);
          const nb = Math.ceil(10 / (1 + diff*diff));
          for (let i = 0; i < nb; i++) {
            availableLevels.push(otherQuestion.level);
          }
        }
      } 

      const targetLevel = sampleOne(availableLevels);
      const targetQuestions = otherQuestions.filter(q => q.level === targetLevel);
      
      console.log('TARGET_LEVEL', targetLevel);

      setQuestion(sampleOne(targetQuestions));
      setRunId('' + Math.random());  
    }, 1000);
  }

  if (!question) {
    return null;
  }

  return (
    <div 
      key={runId} 
      style={{ 
        position: 'relative',
        paddingTop: '3vh',
        paddingLeft: '10vw',
        paddingRight: '10vw',
      }}
    >
      <div style={{ position: 'fixed', top: 10, right: 10 }}>
        {targetTag && <span title={targetTag}>•</span>}
      </div>
      <StarRatings 
        key={level}
        rating={level}
        starRatedColor="yellow"
        starDimension="50px"
        starSpacing="2px"
        numberOfStars={MAX_LEVEL}
        name='rating'
      />

      {level >= 5 ? (
        <div>
          <Confetti />
          <div style={{ 
            paddingTop: '3vh', 
          }}>
            <center>
              <h1
                style={{ 
                  marginTop: 0,
                  marginBottom: '2vh',
                  fontSize: 30,
                  color: 'lime' 
                }}
              >
                BRAVO AMBRE !
              </h1>

              <img
                src={supriseLink}
                alt='funny'
                height='200px'
              />

              <div style={{marginTop: '2vh' }}>
                <button 
                  onClick={onRestart}
                  style={{ 
                    padding: '2vh', 
                    'cursor': 'pointer',
                    fontSize: 20,
                    borderRadius: 10,
                    border: '1px solid lightgray',
                    background: 'white'
                  }}
                >
                  RECOMMENCER
                </button>
              </div>
            </center>
          </div>
        </div>
      ) : (
        <div 
          key={runId} 
          style={{ paddingTop: '6vh' }}
        >
          <Question 
            question={question} 
            onWin={onWin} 
            onLose={onLose} 
            context={{ nbSolvedQuestions }}
          />
        </div>
      )}
    </div>
  )
}

export default Game;