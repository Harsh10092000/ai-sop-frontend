
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AiGen />,
  },
  {
    path: "/v2",
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
