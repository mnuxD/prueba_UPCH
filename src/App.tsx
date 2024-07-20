import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;
