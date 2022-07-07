import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import MyEvents from "./pages/MyEventsPage";
import Search from "./pages/SearchPage";
import CreateEvent from "./pages/CreateEventPage";
import Profile from "./pages/ProfilePage";
import Attendees from "./pages/AttendeesPage";
import Chat from "./pages/ChatPage";
import Event from "./pages/EventPage";
import ProtectedLayout from "./pages/ProtectedLayoutPage";
import MainLayout from "./pages/MainLayoutPage";
import EventLayout from "./pages/EventLayoutPage";
import Verify from "./pages/VerifyPage";
import NotFound from "./pages/NotFoundPage";
import Oops from "./pages/OopsPage";
import { useMemo } from "react";

function App() {
  const { username, authToken } = useMemo(
    () => localStorage, [localStorage.username, localStorage.authToken]
  );


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedLayout {...{ authToken }} />}>
            <Route path="" element={<MainLayout currentUser={username} />}>
              <Route path="users/:username" element={<Profile />} />
              <Route path="events/mine" element={<MyEvents />} />
              <Route path="events/find" element={<Search />} />
              <Route path="events/create" element={<CreateEvent />} />
            </Route>

            <Route path="/" element={<EventLayout />}>
              <Route path="events/:id" element={<Event currentUser={username} />} />
              <Route
                path="events/:id/attendees"
                element={<Attendees />} />
              <Route path="events/:id/chat" element={<Chat />} />
            </Route>
          </Route>


          <Route path="/signup" element={
            authToken ? <Navigate to="/events/mine" /> : <Signup />
          } />
          <Route path="/login" element={
            authToken ? <Navigate to="/events/mine" /> : <Login />
          } />
          <Route path="/verify" element={
            authToken ? <Navigate to="/events/mine" /> : <Verify />
          } />
          <Route path="*" element={<NotFound />} />
          <Route path="500" element={<Oops />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
