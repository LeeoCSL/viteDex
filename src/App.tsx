import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Header} from "./components/header";
import {Home} from './pages/home'
import {Details} from './pages/details'
import {List} from './pages/list'
const queryClient = new QueryClient()

function App() {
  return (
   <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details' element={<Details />} />
        <Route path='/pokedex' element={<List />} />
      </Routes>
    </BrowserRouter>

   </QueryClientProvider>
  )
}

export default App
