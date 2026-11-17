import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DrillPage } from './pages/DrillPage'
import { HomePage } from './pages/HomePage'
import { PatternsPage } from './pages/PatternsPage'
import { QuizPage } from './pages/QuizPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="patterns" element={<PatternsPage />} />
          <Route path="drill" element={<DrillPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
