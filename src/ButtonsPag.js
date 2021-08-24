import React from 'react'

const ButtonsPage = ({
	startCursor,
	endCursor,
	hasPrev,
	hasNext,
	handlePrev,
	handleNext,
	resShow,
	resCount,
}) => {
	return (
		<div className='d-flex justify-content-lg-end my-2'>
			{hasPrev && (
				<button
					className='btn-sm mx-1 btn btn-outline-primary  '
					onClick={() => handlePrev(startCursor, resShow, resCount)}
				>
					Prev
				</button>
			)}
			{hasNext && (
				<button
					className='btn-sm  mx-1 btn btn-outline-primary bi '
					onClick={() => handleNext(endCursor)}
				>
					Next
				</button>
			)}
		</div>
	)
}

export default ButtonsPage
