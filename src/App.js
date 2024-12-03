import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'; // npm i bootstrap-dark-5 bootstrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import { useState, useEffect } from 'react';

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate a delay for loading (you can replace this with actual data fetching logic)
		setTimeout(() => {
			setLoading(false);
		}, 2000); // Adjust the delay as needed
	}, []);

	return (
		<CartProvider>
			<Router>
				<div>
					{loading && (
						<div className="loader">
							<div className="panWrapper">
								<div className="pan">
									<div className="food"></div>
									<div className="panBase"></div>
									<div className="panHandle"></div>
								</div>
								<div className="panShadow"></div>
							</div>
						</div>
					)}
					{!loading && (
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route exact path="/login" element={<Login />} />
							<Route exact path="/signup" element={<Signup />} />
							<Route exact path="/myorder" element={<MyOrder />} />
						</Routes>
					)}
				</div>
			</Router>
		</CartProvider>
	);
}

export default App;
