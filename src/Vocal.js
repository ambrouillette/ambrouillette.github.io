import React, { useCallback, useEffect, useState } from 'react';

const Vocal = ({ text, context }) => {

  const [state, setState] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [isNotFirstQuestion] = useState(context?.nbSolvedQuestions >= 1);

  const run = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    setState('speaking');
    window.speechSynthesis.speak(utterance);
    setTimeout(() => {
      setState('spoken');
    }, 1500);
  }, [text]);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 400);
  }, [])

  useEffect(() => {
    if (loaded && isNotFirstQuestion >= 1) {
      run();
    }
  }, [loaded, isNotFirstQuestion, run]);

  return (
    <div
      style={{
        width: `90px`,
        height: `90px`,
        borderRadius: 7,
        background: state === 'speaking' ? 'beige' : state === 'spoken' ? 'whitesmoke': 'white',
        border: '1px solid black',
        position: 'relative',
        cursor: 'pointer',

      }}
      onClick={run}
    >
      <center>
        <h1 
          style={{ 
            fontSize: 70, 
            marginTop: 'auto', 
            marginBottom: 'auto',
            paddingLeft: 10,
          }}
        >
          ♬
        </h1>
      </center>
     
    </div>
  )
}

export default Vocal;