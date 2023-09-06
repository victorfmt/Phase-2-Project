import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [gods, setGods] = useState([]);
  const [oracleGod, setOracleGod] = useState(null);
  const [displayRandom, setDisplayRandom] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/gods")
      .then(res => res.json())
      .then(data => {
        setGods(data);
        setOracleGod(data[0]); // Set the first god as default
      });
  }, []);

  const getRandomGod = () => {
    return Math.floor(Math.random() * gods.length);
  };
  //math.random generates decimal between 0 and 1 x length (0-5)
  //add subtraction or addition to get a random number between 1 and 6
  //*10 to get a random number between 1 and 10

  const displayRandomGod = () => {
    setDisplayRandom(true);

    setTimeout(() => {
      const randomGodIndex = getRandomGod();
      setOracleGod(gods[randomGodIndex]);
      setDisplayRandom(false);
    }, 1000);
  };

  const godMenu = (god) => {
    return (
      <img src={god.image} onClick={() => godEntry(god)} />
    );
  };

  const godEntry = (god) => {
    setOracleGod(god);
  };

  return (
    <div id="container">
      
      <h1>ORACLE OF THE UNKNOWN GODS</h1>
      
      <div id="oracle">
      {displayRandom && (
        <div>
          <img id="oracle-img" src="images/blackpyramidtransparent.gif" />
        </div>
      )}
        <h1>ORACLE</h1>
        <p>Take a breath... Click on the sphere below to show the forgotten God that will help you in your journey...</p>
      <button id="button" onClick={displayRandomGod}>
        <img style={{width:100}}  src="./images/sphere.png"></img>
      </button>
        <h1 id="entry-title">{oracleGod?.name}</h1>
        <img id="oracle-img" src={oracleGod?.image} />
        
      </div>
      <div id="encyclopedia">
      <div id="pic-selector">
        <h1>God Encyclopedia</h1>
        {gods.map(god => godMenu(god))}
        <p id="entry-para">{oracleGod?.description}</p>
      </div>
      </div>
    </div>
  );
}

export default App;
