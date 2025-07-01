import React from 'react';

export default function App({ user }) {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.name}!</p>
            <p>This is the dashboard micro frontend.</p>
        </div>
    );
}
