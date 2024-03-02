import React from 'react';
import ReactDOM from 'react-dom/client';
import Booking from '@/pages/Booking';

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Booking/>
        </React.StrictMode>
    )
}
