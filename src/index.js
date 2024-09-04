import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';

// API 테스트 파일 임포트
import './api/api-test.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);