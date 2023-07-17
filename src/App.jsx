import { useState } from 'react'
import './App.css'

function App() {
	const [title, setTitle] = useState(0)
	const [body, setBody] = useState(0)

	return (
	<>
		<header className='text-center text-2xl py-4'>React App</header>
		<aside className='fixed left-0 z-40 w-64 h-screen'>
			<li>React</li>
			<li>React Router</li>
		</aside>
		<main className='h-screen mx-64 flex flex-col items-stretch'>
			<input type='text' value={title} onChange={e => setTitle(e.target.value)} />
			<input type='text' value={body} onChange={e => setBody(e.target.value)} />
		</main>
	</>
	)
}

export default App
