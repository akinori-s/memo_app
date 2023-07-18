import { useState } from 'react'
import './App.css'

function App() {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [pages, setPages] = useState([])

	function newPage() {
		var date = new Date(Date.now())
		if (title === '' && body === '') {
			return
		}
		var exists = pages.find(page => page.title === title)
		if (exists) {
			const newState = pages.map(page => {
				if (page.title === title) {
					return {...page, title, body, last_updated: date.toUTCString()};
				} else {
					return page;
				}
			});
			setPages(newState);
		} else {
			setPages(currentPages => {
				return [...currentPages, { id: crypto.randomUUID(),
					title,
					body,
					last_updated: date.toUTCString() }]
				})
		}
		localStorage.setItem('pages', JSON.stringify(pages))
		setTitle('')
		setBody('')
	}

	function openPage(id) {
		newPage()
		var page = pages.find(page => page.id === id)
		setTitle(page.title)
		setBody(page.body)
	}

	console.log(pages)
	
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
			<input type='text' value={title} onChange={e => setTitle(e.target.value)} 
				placeholder='Title'
				className='appearance-none'/>
			<input type='text' value={body} onChange={e => setBody(e.target.value)} 
				placeholder='body...'
				className='appearance-none h-40'/>
		</main>
	</>
	)
}

export default App
