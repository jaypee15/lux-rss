
import './App.css';
import { Route, Routes, BrowserRouter,} from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import MainWrapper from './layouts/MainWrapper';
import Login from './components/Login';
import PrivateRoute from './layouts/PrivateRoute';
import Logout from './components/logout';
import Private from './components/Private';
import Register from './components/Register';
import Profile from './components/Profile';
import ArticleModal from './components/ArticleModal';

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
                      <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/feed/*" element={<Feed />} />
                    <Route path="/feed/:id/*" element={<ArticleModal />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
                
            </MainWrapper>
        </BrowserRouter>
    );
}

export default App;