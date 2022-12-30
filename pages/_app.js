import '../styles/globals.css'

//internal import
import { ToDoListProvider } from '../context/ ToDolistApp'

const MyApp=({ Component, pageProps })=> (
  <ToDoListProvider>
  <div>
       <Component {...pageProps} />
  </div>
 
  </ToDoListProvider>

)

export default MyApp
