import React from 'react';
import {YellowBox} from 'react-native';
import Routes from './routes';

YellowBox.ignoreWarnings(['Async Storage','State updates','React state update'])

const App = () => (
    <Routes />
);

export default App;
