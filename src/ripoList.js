const RipoList = ({ repo }) => {
	let license
	switch (repo.licenseInfo?.spdxId) {
		case undefined:
			license = (
				<span
					className='px-1 py-0 ms-1 d-inline-block btn btn-sm  btn-danger'
					style={{ fontSize: '0.6rem' }}
				>
					No License
				</span>
			)
			break
		case 'NOASSERTION':
			license = (
				<span
					className='px-1 py-0 ms-1 d-inline-block btn btn-sm  btn-warning'
					style={{ fontSize: '0.6rem' }}
				>
					{repo.licenseInfo.spdxId}
				</span>
			)
			break

		default:
			license = (
				<span
					className='px-1 py-0 ms-1 d-inline-block btn btn-sm  btn-outline-success'
					style={{ fontSize: '0.6rem' }}
				>
					{repo.licenseInfo.spdxId}
				</span>
			)
			break
	}

	return (
		<li key={repo.node.id} className='list-group-item'>
			<div className='d-flex justify-content-between align-items-center'>
				<div className='d-flex flex-column'>
					<a
						className='h5 mb-0 text-decoration-none lead'
						href={repo.node.url}
					>
						{repo.node.name}
					</a>
					<p className='small'>{repo.node.description} </p>
				</div>
				<div className='text-nowrap ms-3'>
					{license}

					<span
						className={
							'px-1 py-0 ms-1 d-inline-block btn btn-sm flex-column ' +
							(repo.node.viewerSubscription === 'SUBSCRIBED'
								? 'btn-success font-weight-bold'
								: 'btn-outline-secondary ')
						}
						style={{ fontSize: '0.6rem' }}
					>
						{repo.node.viewerSubscription}
					</span>
				</div>
			</div>
		</li>
	)
}

export default RipoList
