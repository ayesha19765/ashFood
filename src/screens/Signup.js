import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function Signup() {
	const [credentials, setCredentials] = useState({
		name: '',
		email: '',
		password: '',
		geolocation: '',
	});
	let [address, setAddress] = useState('');
	let navigate = useNavigate();

	const handleClick = async (e) => {
		e.preventDefault();
		let navLocation = () => {
			return new Promise((res, rej) => {
				navigator.geolocation.getCurrentPosition(res, rej);
			});
		};
		let latlong = await navLocation().then((res) => {
			let latitude = res.coords.latitude;
			let longitude = res.coords.longitude;
			return [latitude, longitude];
		});
		// console.log(latlong)
		let [lat, long] = latlong;
		console.log(lat, long);
		const response = await fetch('http://localhost:5001/api/auth/getlocation', {
			// mode: 'no-cors',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ latlong: { lat, long } }),
		});
		const { location } = await response.json();
		console.log(location);
		setAddress(location);
		setCredentials({ ...credentials, [e.target.name]: location });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("hello");
		const response = await fetch('http://localhost:5001/api/auth/createuser', {
			// mode: 'no-cors',
			// credentials: 'include',
			// Origin:"http://localhost:3000/login",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: credentials.name,
				email: credentials.email,
				password: credentials.password,
				location: credentials.geolocation,
			}),
		});
		const json = await response.json();
		console.log("hello",json);
		if (json.success) {
			//save the auth toke to local storage and redirect
			localStorage.setItem('token', json.authToken);
			navigate('/login');
		} else {
			alert('Enter Valid Credentials');
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div
			style={{
				backgroundImage:
					// 'url("https://wallpapercave.com/wp/wp9455072.jpg")',
					// 'url("https://images.unsplash.com/photo-1562059390-a761a084768e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D")',
					// 'url("https://www.kunstkopie.de/kunst/aleksandrova_karina/loeffel_salat.jpg")',
					// 'url("https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
					'url("https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg")',
				backgroundSize: 'cover',
				height: '100vh',
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
					background: 'rgba(255, 255, 255, 0.1)' /* Added background */,
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
						className="w-50 m-auto mt-5 rounded"
						onSubmit={handleSubmit}
						style={{
							background: 'rgba(0,0,0, 0.5)' /* Added background */,
							padding: '5px',
						}}
					>
						<div className="m-3">
							<label htmlFor="name" className="form-label">
								Name
							</label>
							<input
								style={{
									background: 'rgba(0,0,0, 0.6)' /* Added background */,
								}}
								type="text"
								className="form-control"
								name="name"
								value={credentials.name}
								onChange={onChange}
								aria-describedby="emailHelp"
							/>
						</div>
						<div className="m-3">
							<label htmlFor="email" className="form-label">
								Email address
							</label>
							<input
								style={{
									background: 'rgba(0,0,0, 0.6)' /* Added background */,
								}}
								type="email"
								className="form-control"
								name="email"
								value={credentials.email}
								onChange={onChange}
								aria-describedby="emailHelp"
							/>
						</div>
						<div className="m-3">
							<label htmlFor="address" className="form-label">
								Address
							</label>
							<fieldset>
								<input
									style={{
										background: 'rgba(0,0,0, 0.6)' /* Added background */,
									}}
									type="text"
									className="form-control"
									name="address"
									placeholder='"Click below for fetching address"'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									aria-describedby="emailHelp"
								/>
							</fieldset>
						</div>
						<div className="m-3">
							<button
								type="button"
								onClick={handleClick}
								name="geolocation"
								className=" btn btn-success"
							>
								Click for current Location{' '}
							</button>
						</div>
						<div className="m-3">
							<label htmlFor="exampleInputPassword1" className="form-label">
								Password
							</label>
							<input
								style={{
									background: 'rgba(0,0,0, 0.6)' /* Added background */,
								}}
								type="password"
								className="form-control"
								value={credentials.password}
								onChange={onChange}
								name="password"
							/>
						</div>
						<button type="submit" className="m-3 btn btn-success">
							Submit
						</button>
						<Link to="/login" className="m-3 mx-1 btn btn-danger">
							Already a user
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
