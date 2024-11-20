import logo from './logo.svg';
import './App.css';
import DetailPlayer from '../src/Detail/DetailPlayer.js';  // Esta es la correcta

 
 


function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          Codecosmos producto3 <code>src/App.js</code> 
        </p>
        
      </header>
      <body>
        <DetailPlayer /> {/* Usa el componente aquí */}
      </body>
      
    </div>
  );
}

export default App;
