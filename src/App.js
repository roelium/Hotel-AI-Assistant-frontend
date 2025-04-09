// src/App.js
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import HomePage from './component/home/HomePage';
import AllRoomsPage from './component/booking_rooms/AllRoomsPage';
import RoomDetailsBookingPage from './component/booking_rooms/RoomDetailsPage';
import FindBookingPage from './component/booking_rooms/FindBookingPage';
import AdminPage from './component/admin/AdminPage';
import ManageRoomPage from './component/admin/ManageRoomPage';
import EditRoomPage from './component/admin/EditRoomPage';
import AddRoomPage from './component/admin/AddRoomPage';
import ManageBookingsPage from './component/admin/ManageBookingsPage';
import EditBookingPage from './component/admin/EditBookingPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import SupportAgent from './component/agent/SupportAgent.tsx';
import { ProtectedRoute, AdminRoute } from './service/guard';
import {SplitLayout} from "@vaadin/react-components";
import AllMyBookings from "./component/booking_rooms/AllMyBookings";
import ApiService from "./service/ApiService";

function App() {
  const [changeByAgent, setChangeByAgent] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    setIsAuthenticated(ApiService.isAuthenticated());

  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <SplitLayout className="h-full" style={{height:'100vh'}}>
          <SupportAgent isAuthenticated={isAuthenticated} changeByAgent={changeByAgent} setChangeByAgent={setChangeByAgent}/>
          <div className="flex flex-col gap-m p-m box-border" style={{width: '70%'}}>
            <Navbar setIsAuthenticated={setIsAuthenticated} />
            <div className="content">
                    <Routes>
                      {/* Public Routes */}
                      <Route exact path="/home" element={<HomePage />} />
                      <Route exact path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/rooms" element={<AllRoomsPage />} />
                      <Route path="/find-booking" element={<FindBookingPage />} />

                      {/* Protected Routes */}
                      <Route path="/room-details-book/:roomId"
                        element={<ProtectedRoute element={<RoomDetailsBookingPage />} />}
                      />
                      <Route path="/mybookings"
                             element={<ProtectedRoute element={<AllMyBookings changeByAgent={changeByAgent} />} />}
                      />
                      <Route path="/profile"
                        element={<ProtectedRoute element={<ProfilePage changeByAgent={changeByAgent} />} />}
                      />
                      <Route path="/edit-profile"
                        element={<ProtectedRoute element={<EditProfilePage />} />}
                      />

                      {/* Admin Routes */}
                      <Route path="/admin"
                        element={<AdminRoute element={<AdminPage />} />}
                      />
                      <Route path="/admin/manage-rooms"
                        element={<AdminRoute element={<ManageRoomPage />} />}
                      />
                      <Route path="/admin/edit-room/:roomId"
                        element={<AdminRoute element={<EditRoomPage />} />}
                      />
                      <Route path="/admin/add-room"
                        element={<AdminRoute element={<AddRoomPage />} />}
                      />
                      <Route path="/admin/manage-bookings"
                        element={<AdminRoute element={<ManageBookingsPage />} />}
                      />
                      <Route path="/admin/edit-booking/:bookingCode"
                        element={<AdminRoute element={<EditBookingPage />} />}
                      />

                      {/* Fallback Route */}
                      <Route path="*" element={<Navigate to="/home" />} />
                    </Routes>

            </div>
            <FooterComponent />
          </div>
        </SplitLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
