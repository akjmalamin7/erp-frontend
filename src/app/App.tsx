import { router } from "@/app/router";
import { store } from "@/app/store";
import "@/index.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#0F172A",
            color: "#fff",
            fontSize: "13px",
          },
        }}
      />
    </Provider>
  );
};

export default App;
