import React, { Suspense, lazy } from "react";
import { Routes as ReactRouterRoutes, Route, Link, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings.jsx"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard.jsx"));
const UserProfile = lazy(() => import("./pages/user/UserProfile.jsx"));
const Home = lazy(() => import("./pages/public/home/Home.jsx"));
const About = lazy(() => import("./pages/public/about/About.jsx"));
const Signup = lazy(() => import("./pages/public/Signup.jsx"));
const Login = lazy(() => import("./pages/public/Login.jsx"));


const Routes = () => {
    const { userRole } = useSelector((state) => state.auth);


    return (
        <React.Fragment>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    {userRole === 'admin' && <li><Link to="/admin/settings">Admin Settings</Link></li>}
                    {userRole === 'user' && <li><Link to="/user/profile">User Profile</Link></li>}
                </ul>
            </nav>

            <Suspense fallback={<div>Loading...</div>}>
                <ReactRouterRoutes>
                    {/* Public Route */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    {/* Admin Routes */}
                    {userRole === 'admin' ? (
                        <>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/settings" element={<AdminSettings />} />
                        </>
                    ) : (
                        <Route path="/admin/*" element={<Navigate to="/" />} />
                    )}

                    {/* User Routes */}
                    {userRole === 'user' ? (
                        <>
                            <Route path="/user/dashboard" element={<UserDashboard />} />
                            <Route path="/user/profile" element={<UserProfile />} />
                        </>
                    ) : (
                        <Route path="/user/*" element={<Navigate to="/" />} />
                    )}

                </ReactRouterRoutes>
            </Suspense>
        </React.Fragment>
    );


}

const Dashboard = () => {
    const { userRole } = useSelector((state) => state.auth);

    return (
        <div>
            <h1>Dashboard</h1>
            {userRole === 'admin' && <p>Welcome Admin!</p>}
            {userRole === 'user' && <p>Welcome User!</p>}
        </div>
    );
};


export default Routes;
