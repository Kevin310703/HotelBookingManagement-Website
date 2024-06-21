import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import Navbar from "./Components/Navbar";
import Rooms from "./Components/Room/Rooms.jsx";
import AddRooms from "./Components/Room/AddRoom.jsx";
import UpdateRoom from "./Components/Room/updateRoom.jsx";
import NoRoomSelected from "./Components/Room/NoRoomSelected.jsx";
import SingleRooms from './Components/Room/SingleRooms.jsx';

import Hotels from "./Components/Hotel/Hotels.jsx";
import AddHotel from "./Components/Hotel/AddHotel.jsx";
import UpdateHotel from "./Components/Hotel/updateHotel.jsx";
import NoHotelSelected from "./Components/Hotel/NoHotelSelected.jsx";
import SingleHotels from './Components/Hotel/SingleHotels.jsx';

import Users from "./Components/User/Users.jsx";
import AddUser from './Components/User/AddUser.jsx';
import UpdateUser from './Components/User/UpdateUser.jsx';

import Bookings from "./Components/Bookings";
import { UserAuthContextProvider } from "./contexts/UserAuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <Navbar />
        <Routes>
          <Route index path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
          <Route path="/addRoom" element={<ProtectedRoute><AddRooms /></ProtectedRoute>} />
          <Route path="/updateRoom/:id" element={<ProtectedRoute><UpdateRoom /></ProtectedRoute>} />
          <Route path="/updateRoom" element={<ProtectedRoute><NoRoomSelected /></ProtectedRoute>} />
          <Route path="/rooms/:slug" element={<ProtectedRoute><SingleRooms /></ProtectedRoute>} />

          <Route path="/hotels" element={<ProtectedRoute><Hotels /></ProtectedRoute>} />
          <Route path="/addHotel" element={<ProtectedRoute><AddHotel /></ProtectedRoute>} />
          <Route path="/updateHotel/:id" element={<ProtectedRoute><UpdateHotel /></ProtectedRoute>} />
          <Route path="/updateHotel" element={<ProtectedRoute><NoHotelSelected /></ProtectedRoute>} />
          <Route path="/hotels/:slug" element={<ProtectedRoute><SingleHotels /></ProtectedRoute>} />

          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/addUser" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />

          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;