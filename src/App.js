import github from './db'
import { useEffect, useState, useCallback } from 'react'
import query from './Query'
import RipoList from './ripoList'
import SearchBox from './SearchBox'
import ButtonsPage from './ButtonsPag'

function App() {
	let [userName, setUserName] = useState('')
	let [repoes, setRepoes] = useState(null)
	let [pageCount, setPageCount] = useState(10)
	let [queryString, setQueryString] = useState('')
	let [totalCount, setTotalCount] = useState()

	let [firstLast, setFirstLast] = useState('first')
	let [beforeAfter, setBeforeAfter] = useState('')
	let [activCursor, setActivCursor] = useState('')
	let [startCursor, setStartCursor] = useState('')
	let [endCursor, setEndCursor] = useState('')
	let [hasNext, setHasNext] = useState('')
	let [hasPrev, setHasPrev] = useState('')
	// let [resCountFrom, setResCountFrom] = useState(0)
	// let [resCountTo, setResCountTo] = useState(pageCount)
	// let [resShow, setResShow] = useState(0)

	const fetchData = useCallback(() => {
		const queryText = JSON.stringify(
			query(queryString, pageCount, firstLast, beforeAfter, activCursor)
		)

		fetch(github.baseURL, {
			method: 'POST',
			headers: github.headers,
			body: queryText,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data, queryString)
				const viewer = data.data.viewer
				const repoData = data.data.search.edges
				const totalRes = data.data.search.repositoryCount
				const startC = data.data.search.pageInfo.startCursor
				const endC = data.data.search.pageInfo.endCursor
				const nextP = data.data.search.pageInfo.hasNextPage
				const prevP = data.data.search.pageInfo.hasPreviousPage
				// const show = repoData.length

				setUserName(viewer.name)
				setRepoes(repoData)
				setTotalCount(totalRes)
				setStartCursor(startC)
				setEndCursor(endC)
				setHasNext(nextP)
				setHasPrev(prevP)
				// setResShow(show)
				// console.log('resShow', resShow)
			})

			.catch((err) => {
				console.log(err)
			})
	}, [pageCount, queryString, firstLast, beforeAfter, activCursor])
	useEffect(() => {
		fetchData()
	}, [fetchData])

	return (
		<div className='App container mt-5'>
			<h1 className='text-primary'>
				<i className='bi bi-diagram-2-fill'></i> Repoes
			</h1>
			<p>Hello there {userName}</p>
			<SearchBox
				queryString={queryString}
				pageCount={pageCount}
				totalCount={totalCount}
				onQueryChange={(qText) => {
					setQueryString(qText)
				}}
				onTotalChange={(ppNum) => {
					setPageCount(ppNum)
				}}
			/>
			<ButtonsPage
				startCursor={startCursor}
				endCursor={endCursor}
				hasNext={hasNext}
				hasPrev={hasPrev}
				// resShow={resShow}
				handleNext={(endCursor, resShow, pageCount) => {
					setFirstLast('first')
					setBeforeAfter('after:')
					setActivCursor('"' + endCursor + '"')
					// setResCountTo(pageCount + resShow)
					// setResCountFrom(setResCountTo - resShow)
				}}
				handlePrev={(startCursor) => {
					setFirstLast('last')
					setBeforeAfter('before:')
					setActivCursor('"' + startCursor + '"')
				}}
			/>
			{/* {resCountFrom} {resCountTo} ({resShow + pageCount}) */}
			{repoes && (
				<ul className='list-group list-group-flush'>
					{repoes.map((repo) => (
						<RipoList repo={repo} key={repo.node.id} />
					))}
				</ul>
			)}
		</div>
	)
}

export default App
