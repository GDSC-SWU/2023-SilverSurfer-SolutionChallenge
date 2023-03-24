import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reducer from "./store/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import localStorage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import theme from "./assets/theme";
import GlobalStyle from "./GlobalStyle";

const persistConfig = {
  key: "root",
  storage: localStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export let persistor = persistStore(store);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              >
                <App />
                <GlobalStyle />
              </GoogleOAuthProvider>
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
