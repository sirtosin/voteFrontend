import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Vote from "./components/Vote";
import { fetchUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
    console.log('user ',user);
  }, [user]);
  return (
    <div className="container">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/vote" element={<Vote />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
