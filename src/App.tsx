import { RouterProvider } from "react-router-dom";
import router from "./router";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <RouterProvider router={router} />;
    </WeatherProvider>
  );
}

export default App;
