
// import './App.css'
// import AiGen from './pages/aiGen/AiGen'
// import AiGenVer2 from './pages/aiGenVer2/AiGenVer2'
// import {
//   RouterProvider,
//   createBrowserRouter,
//   Navigate,
// } from "react-router-dom";

// function App() {
 

//   return (
//     <AiGen />
//    <AiGenVer2 />
//   )
// }

// export default App


import './App.css';
import AiGen from './pages/aiGen/AiGen';
import AiGenVer2 from './pages/aiGenVer2/AiGenVer2';
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import AiGenVer3 from './pages/aiGevVer3/AiGenVer3';
const router = createBrowserRouter([
  {
    path: "/",
    element: <AiGenVer3 />,
  },
  {
    path: "/v2",
    element: <AiGen />,
  },
  {
    path: "/v3",
    element: <AiGenVer2 />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
