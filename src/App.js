import React, { useState, useRef } from 'react';
import './App.scss';
import JsonTree from './JsonTree/JsonTree'

function App() {

  const inputElement = useRef(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  let retrieveJSON = () => {
    setUrl(inputElement.current.value);
    setLoading(true);
  }

  return (
    <div className="App">
      <input defaultValue="https://www.amiiboapi.com/api/amiibo/" placeholder="Type JSON URL here" ref={inputElement}/>
      <button onClick={retrieveJSON}>Retrieve JSON</button>
      {loading && <div>Loading...</div>}
      <JsonTree url={url} callback={() => {setLoading(false)}} />
    </div>
  );
}

export default App;
