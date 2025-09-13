
import { Routes, Route } from 'react-router-dom';

import Chat from "./components/Chat";
import Mainpage from "./components/Mainpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
