import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './root.css';
import CommonsPage from './pages/CommonsPage.js';
import HomePage from './pages/HomePage.js';
import ItemsPage from './pages/ItemsPage.js';
import BoardsPage from './pages/BoardsPage.js';
import RegisPage from './pages/RegisPage.js';
import LogInPage from './pages/LogInPage.js';
import SignUpPage from './pages/SignUpPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<CommonsPage/>}>
				<Route index element={<HomePage/>}/>
				<Route path="items" element={<ItemsPage/>}/>
				<Route path="boards" element={<BoardsPage/>}/>
				<Route path="registration" element={<RegisPage/>}/>
				<Route path="login" element={<LogInPage/>}/>
				<Route path="signup" element={<SignUpPage/>}/>
			</Route>
			<Route path="*" element={<NotFoundPage/>}/>
		</Routes>
	</BrowserRouter>
);