import { Outlet } from "react-router-dom";
import styles from './App.module.css';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
		<>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
      <Footer />
		</>
  );
}

export default App;
