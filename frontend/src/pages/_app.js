import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/config/redux/store";
import { useEffect } from "react";
import { initializeAuth } from "@/config/redux/auth/authSlice";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
