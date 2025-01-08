import React from 'react';
import { Provider } from "./components/ui/provider"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProductPage from './ProductPage';
import Users from './Users';

function App() {
    return (
        <Provider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/product" element={<ProductPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
