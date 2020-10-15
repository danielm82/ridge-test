import React, { useEffect, useState } from 'react';
import TreeChildren from './TreeChildren';
import './JsonTree.scss';

function JsonTree({url, callback}) {

  const [json, setJson] = useState();

  /*
  Note that I would normally place the API call outside of the ui component, and give it the retrieved json as a property instead.
  However, the test specifically stated that the ui component needs to do the json retrieval itself.
  */
  useEffect(() => {
    if (url === '') return;
    try {
      if (new URL(url)) {
        fetch(url).then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          res.json().then(data => {
            setJson(data);
            callback();
          });
        }).catch(function(error) {
          console.log(error);
        });
      }
    } catch {
      setJson(null);
      callback();
    }
  }, [url, callback]);

  const renderJsonTree = obj => {
    if (obj === undefined) return '';
    if (obj === null) return 'No JSON';
    return <TreeChildren data={obj} level={0}/>
  }

  return (
    <div className="jsonTree">
      {renderJsonTree(json)}
    </div>
  );
}

export default JsonTree;
