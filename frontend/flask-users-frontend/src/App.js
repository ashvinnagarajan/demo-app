import React from 'react';
import { Provider } from "./components/ui/provider"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Users from './Users';

function App() {
    return (
        <Provider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
