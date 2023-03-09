import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// CSS + Bootstrap
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@src/assets/scss/custom.scss'

// React Router DOM
import { BrowserRouter } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux'
import { store } from './store/store'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
