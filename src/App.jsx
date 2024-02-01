import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProSidebarProvider } from "react-pro-sidebar";
import React from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { store } from "./utils/appStore";

function App() {
  return (
    <Provider store={store}>
      <ProSidebarProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Routes />
        </GoogleOAuthProvider>
      </ProSidebarProvider>
    </Provider>
  );
}

export default App;
