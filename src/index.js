import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeechProvider } from '@speechly/react-client';

import './index.css';
import App from './App';
import { Provider } from './Context/context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SpeechProvider appId='c17a055c-fb05-411c-ae1e-b7780d2549bb' language='en-US'>
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>
);

