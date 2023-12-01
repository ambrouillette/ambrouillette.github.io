import Game from './Game';

function App() {
  return (
    <div 
      className="App" 
      style={{ 
        position: 'fixed',
        top: 0,
        left:0,
        width: '100vw', 
        height: '100vh',
        background: 'snow',
        border: '5px solid white',
        boxSizing: 'border-box',
      }}
    >
      <Game />
    </div>
  );
}

export default App;
