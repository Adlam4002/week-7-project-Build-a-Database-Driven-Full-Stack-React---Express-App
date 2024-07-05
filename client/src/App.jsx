import "./App.css";
import Header from "./components/Header";
import Form from "./pages/Form";
import { Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/reviews" element={<Posts />}></Route>
        <Route path="/submit-a-review" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
