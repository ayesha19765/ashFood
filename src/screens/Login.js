import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
export default function Login() {
	const [credentials, setCredentials] = useState({ email: '', password: '' });
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:5001/api/auth/login', {
			// credentials: 'include',
			// Origin:"http://localhost:3000/login",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
			//save the auth toke to local storage and redirect
			localStorage.setItem('userEmail', credentials.email);
			localStorage.setItem('token', json.authToken);
			navigate('/');
		} else {
			alert('Enter Valid Credentials');
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		// <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>

		<div
			style={{
				backgroundImage:
					'url("https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640773.jpg&fm=jpg")',
				height: '100vh',
				backgroundSize: 'cover',
        display: 'flex',
				flexDirection: 'column',
			}}
		>
			<div>
				<Navbar />
			</div>
			<div
				style={{
					height: '100vh',
					backgroundSize: 'cover',
					background: 'rgba(255, 255, 255, 0.2)' /* Added background */,
					boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' /* Added boxShadow */,
					backdropFilter: 'blur(7.4px)' /* Added backdropFilter */,
					WebkitBackdropFilter: 'blur(7.4px)' /* Added WebkitBackdropFilter */,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div className="container">
					<form
						className="w-50 m-auto  rounded"
						onSubmit={handleSubmit}
						style={{
							background: 'rgba(0,0,0, 0.5)' /* Added background */,
							padding: '10px',
						}}
					>
						<div className="m-3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								name="email"
								value={credentials.email}
								onChange={onChange}
								aria-describedby="emailHelp"
								style={{
									background: 'rgba(0,0,0, 0.6)' /* Added background */,
								}}
							/>
							<div id="emailHelp" className="form-text">
								We'll never share your email with anyone.
							</div>
						</div>
						<div className="m-3">
							<label htmlFor="exampleInputPassword1" className="form-label">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								value={credentials.password}
								onChange={onChange}
								name="password"
                style={{
									background: 'rgba(0,0,0, 0.6)' /* Added background */,
								}}
							/>
						</div>
						<button type="submit" className="m-3 btn btn-success">
							Submit
						</button>
						<Link to="/signup" className="m-3 mx-1 btn btn-danger">
							New User
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}

// , 'Accept': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:3000/login', 'Access-Control-Allow-Credentials': 'true',
//         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
