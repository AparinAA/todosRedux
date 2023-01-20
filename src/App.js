import React from 'react'
import Header from './features/header/Header';
import Todolist from './features/todos/Todolist';
import Footer from './features/footer/Footer';
import TodoLayout from './components/TodoLayout';

function App() {
	return (
		<div className="App">
			<nav>
				<section>
					<h1>Redux Fundamentals Example</h1>

					<div className="navContent">
						<div className="navLinks"></div>
					</div>
				</section>
			</nav>
			<main>
				<section className="medium-container">
					<h2>Todos</h2>
					<TodoLayout>
						<Header />
						<Todolist />
						<Footer />
					</TodoLayout>
				</section>
			</main>
		</div>
	)
}

export default App
