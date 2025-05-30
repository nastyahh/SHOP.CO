import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { App } from "./App.tsx";
import NotificationProvider from "./HOC/NotificationProvider.tsx";
import { ModalProvider } from "./HOC/ModalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ModalProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </ModalProvider>
    </Provider>
  </BrowserRouter>
);
