import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import Layout from "./pages/LayoutPage";
import Verify from "./pages/VerifyPage";
import NotFound from "./pages/NotFoundPage";
import Oops from "./pages/OopsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="users/:username" element={<Profile />} />
            <Route path="events/mine" element={<MyEvents />} />
            <Route path="events/find" element={<Search />} />
            <Route path="events/create" element={<CreateEvent />} />

            <Route path="/events/:id" element={<Event />} />
            <Route path="/events/:id/attendees" element={<Attendees />} />
            <Route path="/events/:id/chat" element={<Chat />} />
          </Route>


          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="*" element={<NotFound />} />
          <Route path="500" element={<Oops />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
