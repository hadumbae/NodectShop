import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PersistGate } from "redux-persist/integration/react";
import {persistor} from "./state/store.ts";

import "./index.css"
import router from "./navigation/router.ts";

import { RouterProvider} from "react-router-dom";
import {store} from "./state/store.ts";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
              <PersistGate persistor={persistor}>
                  <RouterProvider router={router} />
                  <ToastContainer
                      position="top-center"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                  />
              </PersistGate>
          </Provider>
      </QueryClientProvider>
  </StrictMode>,
)
