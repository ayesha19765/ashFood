import React from 'react';
import '../App.css'; // Ensure this file includes the necessary styles
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
	return (
		<div className="footer-container">
			<div className="container align-items-center">
				<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
					<div
						className="col-md-4 d-flex align-items-center"
						style={{ minWidth: '100%' }}
					>
						{/* <a
							href="/"
							className="mb-3 me-2 mb-md-0 text-muted text-decoration-none  lh-1" style={{ minWidth: '100%', backgroundColor: 'red'}}
						>
							//You can place a logo here if you have one 
						</a> */}
						{/* <span className="text-muted">© 2024 <i>AshFoods</i>, Inc</span> */}
						<span style={{ minWidth: '100%', fontSize:'20px' }}>
							Made with <i className="fa fa-heart pulse"></i> by{' '}
							{/* <a
            href="https://www.google.de/maps/place/Augsburger+Puppenkiste/@48.360357,10.903245,17z/data=!3m1!4b1!4m2!3m1!1s0x479e98006610a511:0x73ac6b9f80c4048f"
            target="_blank"
            rel="noopener noreferrer"
          > */}
							<span className='fst-italic'>Ayesha</span>
							{/* </a> */}
						</span>
					</div>

					{/* <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
						<li className="ms-3">
							<a className="text-muted" href="/">
								<svg className="bi" width="24" height="24">
									<use href="#icon-path-1"></use>
								</svg>
							</a>
						</li>
						<li className="ms-3">
							<a className="text-muted" href="/">
								<svg className="bi" width="24" height="24">
									<use href="#icon-path-2"></use>
								</svg>
							</a>
						</li>
						<li className="ms-3">
							<a className="text-muted" href="/">
								<svg className="bi" width="24" height="24">
									<use href="#icon-path-3"></use>
								</svg>
							</a>
						</li>
					</ul> */}
				</footer>
			</div>
		</div>
	);
}
