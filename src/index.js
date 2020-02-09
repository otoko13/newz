import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { loadFabricTheme } from './loadOfficeFabric';

loadFabricTheme();

ReactDOM.render(<App />, document.getElementById('root'));
