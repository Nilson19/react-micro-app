import React from 'react';
import QuoteView from './views/QuoteView';

export default function App({ user }) {
    console.log('App initialized with user in dash:', user);
    return (
            <QuoteView />
    );
}