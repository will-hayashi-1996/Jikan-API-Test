import React, { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aux, setAux] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.jikan.moe/v4/anime?q=${aux}`)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  };

  const myStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#3498db',
    height: '100%',
  };

  const myStyle2 = {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: '24px',
    width: '300px',
    heigth: '300px',
    margin: '10px', // Add margin to create spacing between items
    padding: '10px', // Add padding for better visual separation
  };

  return (
    <div className="App" style={myStyle}>
      <MyForm aux={aux} setAux={setAux} handleSubmit={handleSubmit} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={myStyle}>
          {data.data.map((element, index) => (
            <div style={myStyle2} key={index}>
              <li>{element.title}</li>
              <img src={element.images.jpg.image_url} alt="Description of the image" />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

function MyForm({ aux, setAux, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          value={aux}
          onChange={(e) => setAux(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
}

export default App;
