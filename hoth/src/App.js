import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./login.js";
import Signup from "./signup.js";
import Major from "./major.js";
import VideoStream from "./VideoStream.js"
import Room from "./room.js"

import MajorPage from "./majorPage.js";

export default function App() {
  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/major",
    element: <Major />,
  },
  {
    path: "/Major/:major",
    element: <MajorPage />,
  },
  {
    path: "/major/:major/:room_name",
    element: <Room />,
  },
]);

/*

  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/clubs",
    element: <Clubs/>,
  },
  {
    path: "/clubsignup",
    element: <AddClub/>,
  },
  {
    path: "/club/:id",  
    element: <ClubDetails />,
  },{
    path: "/apply",
    element: <Apply/>,
  },
  {
    path: "/create",
    element: <Create/>,
  },
  {
    path: "/studentpreference",
    element: <StudentPreference/>,
  },
  {
    path: "/myfavclub",
    element: <FavClubs/>,
  },
  {
    path: "/ViewApp",
    element: <ViewApp/>,
  },
*/
