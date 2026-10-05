import { Navigate, Route, Routes } from 'react-router-dom'
import { PrototypeIndex } from './screens/PrototypeIndex'
import { screens } from './screens'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrototypeIndex />} />
      {screens.map((screen) => (
        <Route key={screen.path} path={screen.path} element={<screen.component />} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
