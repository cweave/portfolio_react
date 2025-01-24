import NavBar from './components/navbar';
import './styles/main.scss';
import Landing from './views/landing';
import About from './views/about';
import Projects from './views/projects';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className='body-wrapper'>
        <Landing />
        <About />
        <Projects />
      </div>
      <Footer />
    </div>
  );
}

export default App;
