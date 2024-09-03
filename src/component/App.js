import { Fragment } from 'react';
import '../css/App.css';
import Footer from './Footer';
import Nav from './Nav';
import BestItem from './BestItem';
import ItemList from './ItemList';

function App() {
  return (
    <Fragment>
      <Nav className='Nav' />
      <div className='section'>
        <BestItem className='BestItem' />
        <ItemList className='ItemList' />
      </div>
      <Footer className='Footer' />
    </Fragment>
  );
}

export default App;
