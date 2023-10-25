import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NoteState from "./context/notes/NoteState";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Provider } from "react-redux";
import store from "./ReduxStore/store";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <Provider store={store}>
        <NoteState>
          <Router>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </Router>
        </NoteState>
      </Provider>
    </>
  );
}

export default App;
