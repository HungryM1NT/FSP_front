import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import HomePage from './pages/HomePage/HomePage';
import AuthPage from "./pages/AuthPage/AuthPage";
import ExplorerPage from "./pages/ExplorerPage/ExplorerPage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/explorer" element={<ExplorerPage/>} />
          <Route path="/auth" element={<AuthPage/>} />
        </Routes>
    </Router>
  );
}

export default App;
