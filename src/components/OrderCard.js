export default function OrderCard(props) {
	return (
		<div
			className="card mx-auto"
			style={{
				maxWidth: '16rem',
				maxHeight: '360px',
				// marginTop: '20px',
				marginBottom: '50px',
			}}
		>
			<div
				style={{
					overflow: 'hidden',
				}}
			>
				<img
					src={props.img}
					className="order-card-img-top"
					alt="..."
					style={{
						width: '100%',
						objectFit: 'cover',
						backgroundColor: 'red',
					}}
					id="card-img-top"
				/>
				<div className="card-body" style={{ textAlign: 'center' }}>
					<h5 className="card-title">{props.name}</h5>
					<div className="container w-100 p-0" style={{ height: '38px' }}>
						<div className="d-inline ms-2 h-100 w-20 fs-5">
							<span className="m-1">{props.qty}</span>
							<span className="m-1">{props.size}</span>
						</div>
						<div className="d-inline ms-2 h-100 w-20 fs-5">
							₹{props.price}/-
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
