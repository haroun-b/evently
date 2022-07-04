import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyEventsPage from "./pages/MyEventsPage";
import SearchPage from "./pages/SearchPage";
import CreateEventPage from "./pages/CreateEventPage";
import ProfilePage from "./pages/ProfilePage";
import AttendeesPage from "./pages/AttendeesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyEventsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search-events" element={<SearchPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/:username" element={<ProfilePage />} />

          {/* Testing purpose */}
          <Route path="/attendees" element={<AttendeesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
