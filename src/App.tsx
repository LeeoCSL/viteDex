import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header'
// import { Details } from './pages/details'
import { Home } from './pages/home'
import { List } from './pages/list'
import { NewList } from './pages/newList'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/viteDex">
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          {/* <Route element={<Details />} path="/details" /> */}
          <Route element={<NewList />} path="/pokedex" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
