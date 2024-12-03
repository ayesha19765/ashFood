import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
	const [foodCat, setFoodCat] = useState([]);
	const [foodItems, setFoodItems] = useState([]);
	const [search, setSearch] = useState('');

	const loadFoodItems = async () => {
		try {
			let response = await fetch('http://localhost:5001/api/auth/foodData', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			// Check if the response is successful
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			let data = await response.json();
			setFoodItems(data[0]);
			setFoodCat(data[1]);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		loadFoodItems();
	}, []);

	return (
		<div>
			<Navbar />
			<div
				id="carouselExampleFade"
				className="carousel slide carousel-fade"
				data-bs-ride="carousel"
			>
				<div className="carousel-inner" id="carousel">
					<div className="carousel-caption" style={{ zIndex: '9' }}>
						<div className="d-flex justify-content-center">
							<input
								className="form-control me-2 w-75 text-dark"
								type="search"
								placeholder="Search in here..."
								aria-label="Search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<button
								className="btn text-white bg-danger"
								onClick={() => setSearch('')}
							>
								X
							</button>
						</div>
					</div>
					<div className="carousel-item active">
						<img
							src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
							className="d-block w-100"
							style={{ filter: 'brightness(35%)' }}
							alt="..."
						/>
					</div>
					<div className="carousel-item">
						<img
							src="https://i.pinimg.com/originals/d1/18/9c/d1189cd88ece8a596bf05329202da1c2.jpg"
							className="d-block w-100"
							style={{ filter: 'brightness(35%)' }}
							alt="..."
						/>
					</div>
					<div className="carousel-item">
						<img
							src="https://d4t7t8y8xqo0t.cloudfront.net/resized/750X436/eazytrendz%2F3399%2Ftrend20220209061003.jpg"
							className="d-block w-100"
							style={{ filter: 'brightness(35%)' }}
							alt="..."
						/>
					</div>
				</div>
				<button
					className="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleFade"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleFade"
					data-bs-slide="next"
				>
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
			<div className="container">
				{foodCat.length > 0
					? foodCat.map((data) => (
							<div className="row mb-3" key={data.id}>
								<div className="fs-3 m-3">{data.CategoryName}</div>
								<hr
									style={{
										height: '4px',
										backgroundImage:
											'-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))',
									}}
								/>
								{foodItems.length > 0 ? (
									foodItems
										.filter(
											(items) =>
												items.CategoryName === data.CategoryName &&
												items.name.toLowerCase().includes(search.toLowerCase())
										)
										.map((filterItems) => (
											<div
												className="col-12 col-md-6 col-lg-3"
												key={filterItems.id}
											>
												<Card
													foodName={filterItems.name}
													item={filterItems}
													options={filterItems.options[0]}
													ImgSrc={filterItems.img}
												/>
											</div>
										))
								) : (
									<div>No Such Data</div>
								)}
							</div>
					  ))
					: ''}
			</div>
			<Footer />
		</div>
	);
}
