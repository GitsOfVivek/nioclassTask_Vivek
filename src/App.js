import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { MathJaxContext } from 'better-react-mathjax';

function App() {
	return (
		<MathJaxContext>
			<Header />
			<Main />
			<Footer />
		</MathJaxContext>
	);
}

export default App;
