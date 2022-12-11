import React from 'react'
import ReactDOM from 'react-dom'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'

import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>,
    document.getElementById('root'),
)