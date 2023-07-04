// import './App.css';



// function App() {
//   return (
//     <div className="App">
//       <Feed />
      
//     </div>
//   );
// }

// export default App;


import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import MainWrapper from './layouts/MainWrapper';
import Login from './components/Login';
import PrivateRoute from './layouts/PrivateRoute';
import Logout from './components/logout';
import Private from './components/Private';
import Register from './components/Register';

function App() {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>
                    <Route
                        path="/private"
                        element={
                            <PrivateRoute>
                                <Private />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App;