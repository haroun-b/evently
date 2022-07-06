import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyEventsPage from "./pages/MyEventsPage";
import SearchPage from "./pages/SearchPage";
import CreateEventPage from "./pages/CreateEventPage";
import ProfilePage from "./pages/ProfilePage";
import AttendeesPage from "./pages/AttendeesPage";
import ChatPage from "./pages/ChatPage";
import EventPage from "./pages/EventPage";
import Layout from "./pages/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path="" element={<MyEventsPage />} />
            <Route path="events/find" element={<SearchPage />} />
            <Route path="events/create" element={<CreateEventPage />} />
            <Route path=":username" element={<ProfilePage />} />
          </Route>


          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Testing purpose */}
          <Route path="/attendees" element={<AttendeesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/events/:id" element={<EventPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
