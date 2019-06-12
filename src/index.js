import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

function createObject() {
    console.log('outer this', this)
    return {
        arrowFunction: () => {
            console.log('arrow this', this);
        },
        functionKeywordFunction: function () {
            console.log('function this', this)
        }
    }
}

const obj = createObject();
console.log('obj', obj)
//obj.arrowFunction();
//obj.functionKeywordFunction();