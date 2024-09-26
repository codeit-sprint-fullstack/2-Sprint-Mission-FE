import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './root.css';
import CommonsPage from './pages/CommonsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ItemsPage from './pages/ItemsPage.jsx';
import BoardsPage from './pages/BoardsPage.jsx';
import RegisPage from './pages/RegisPage.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ViewportProvider from './context/ViewportProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ViewportProvider>
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
	</ViewportProvider>
);
