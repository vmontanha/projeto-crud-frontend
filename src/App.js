import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Layout from './components/Layout';
import { AuthProvider } from './routes/AuthProvider';
import PrivateRoute from './routes/priivateRoute';

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Router>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route 
                                path="/dashboard" 
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                } 
                            />
                            <Route 
                                path="/post/:id" 
                                element={
                                    <PrivateRoute>
                                        <Post />
                                    </PrivateRoute>
                                } 
                            />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </Layout>
                </AuthProvider>
            </Router>
        </SnackbarProvider>
    );
}

export default App;
