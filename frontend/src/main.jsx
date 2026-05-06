import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from "recoil";
import AuthProvider from './components/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <App />
    </RecoilRoot>
)
