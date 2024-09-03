import '../css/App.css';
import Footer from './Footer';
import Nav from './Nav';
import BestItem from './BestItem';

function App() {
  return (
    <>
      <Nav className='Nav' />
      <BestItem className='BestItem' />
      <Footer className='Footer' />
    </>
  );
}

export default App;
