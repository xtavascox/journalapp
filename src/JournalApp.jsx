import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import { Approuter } from "./routers/Approuter"
import { store } from './store/store'
export const JournalApp = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Approuter />
        </BrowserRouter>
      </Provider>
    </>

  )
}
