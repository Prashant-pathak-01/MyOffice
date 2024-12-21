import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/home";
import About from "./views/about";
import Contact from "./views/contact";
import Login from "./views/login";
import Signup from "./views/signup";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
