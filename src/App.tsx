import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./routes/AppRoutes";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import "./App.css";
import Toolbar from "./components/Toolbar/Toolbar";

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <div className="App">
          <Toolbar />
          <div className="contentRoutes">
            <AppRoutes />
          </div>
        </div>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
