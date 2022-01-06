import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { ReservationProvider } from "./context/ReservationContext";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <ReservationProvider>
      <Router>
        <Layout>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route  path="/menu" element={<Menu />} />
              <Route  path="/contact-us" element={<Contact />} />
              <Route path="/resevations" element={<Reservation />} />

          </Routes>
        </Layout>
    </Router>
    </ReservationProvider>
  );
}

export default App;
