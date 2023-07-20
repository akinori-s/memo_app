import { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [uuid, setUuid] = useState()
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [pages, setPages] = useState([])

	useEffect(() => {
		const pages = JSON.parse(localStorage.getItem('pages')) || []
		const title = localStorage.getItem('title') || ''
		const body = localStorage.getItem('body') || ''
		const uuid = localStorage.getItem('uuid') || crypto.randomUUID()
		setPages(pages)
		setTitle(title)
		setBody(body)
		setUuid(uuid)
	}, []);

	function newPage() {
		var date = new Date(Date.now())
		if (title === '' && body === '') {
			return
		}
		var exists = pages.find(page => page.id === uuid)
		if (exists) {
			const newState = pages.map(page => {
				if (page.id === uuid) {
					return {...page, title, body, last_updated: date.toUTCString()};
				} else {
					return page;
				}
			});
			setPages(newState);
		} else {
			setPages(currentPages => {
				return [...currentPages, { id: uuid,
					title,
					body,
					last_updated: date.toUTCString() }]
				})
		}
		localStorage.setItem('pages', JSON.stringify(pages))
		setTitle('')
		setBody('')
		setUuid(crypto.randomUUID())

	}

	function openPage(id) {
		newPage()
		var page = pages.find(page => page.id === id)
		setTitle(page.title)
		setBody(page.body)
		setUuid(page.id)
	}

	function handlePageTitleFocusOut(e) {
		localStorage.setItem('title', title)
	}

	function handlePageBodyFocusOut(e) {
		localStorage.setItem('body', body)
	}

	return (
	<>
		<header className='text-center text-2xl py-4'>React App</header>
		<aside className='fixed left-0 z-40 w-64 h-screen'>
			<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
				onClick={newPage}>
				New Page
			</button>
			<ul>
				{pages.map(page => {
					return <li className='bg-green-300 w-300px' key={page.id} onClick={() => openPage(page.id)}
						>{page.title}</li>
				})}
			</ul>
		</aside>
		<main className='h-screen mx-64 flex flex-col items-stretch'>
			<input type='text' value={title} onChange={e => setTitle(e.target.value)} onBlur={e => handlePageTitleFocusOut(e)} 
				placeholder='Title'
				className='appearance-none'/>
			<input type='text' value={body} onChange={e => setBody(e.target.value)} onBlur={e => handlePageBodyFocusOut(e)} 
				placeholder='body...'
				className='appearance-none h-40'/>
		</main>
	</>
	)
}

export default App
