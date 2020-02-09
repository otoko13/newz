import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import NewzApp from './NewzApp';
import { loadFabricTheme } from './loadOfficeFabric';

loadFabricTheme();

ReactDOM.render(<NewzApp />, document.getElementById('root'));
