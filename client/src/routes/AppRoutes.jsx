// FILE: client/src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Explore from '../pages/Explore';
import Navbar from "../components/Navbar";
import Messages from '../pages/Messages';
import Notifications from '../pages/Notifications';
import PostDetail from '../pages/PostDetail';
import Communities from '../pages/Communities';
import CommunityDetail from '../pages/CommunityDetail';
import Settings from '../pages/Settings';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:conversationId" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="communities" element={<Communities />} />
        <Route path="communities/:handle" element={<CommunityDetail />} />
        <Route path="settings" element={<Settings />} />
        <Route path="post/:id" element={<PostDetail />} />
        <Route path=":username" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;