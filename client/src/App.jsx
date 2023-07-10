import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TenantPage from './routes/TenantPage';
import TenantAddPage from './routes/TenantAddPage';
import TenantUpdatePage from './routes/TenantUpdatePage';
import './index.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/add' element={<TenantAddPage />} />
          <Route exact path='/update/:id' element={<TenantUpdatePage />} />
          <Route exact path='/' element={<TenantPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
