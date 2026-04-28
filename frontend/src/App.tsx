import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/layout/Navbar';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { CataloguePage } from './pages/public/CataloguePage';
import { ProductDetailPage } from './pages/public/ProductDetailPage';
import { SoumettreProduct } from './pages/vendeur/SoumettreProduct';
import { MesProduits } from './pages/vendeur/MesProduits';
import { MesEncheres } from './pages/acheteur/MesEncheres';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ValidateProduits } from './pages/admin/ValidateProduits';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public */}
              <Route path="/" element={<CataloguePage />} />
              <Route path="/produits/:id" element={<ProductDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Vendeur */}
              <Route path="/vendeur/soumettre" element={
                <ProtectedRoute roles={['VENDEUR']}><SoumettreProduct /></ProtectedRoute>
              } />
              <Route path="/vendeur/mes-produits" element={
                <ProtectedRoute roles={['VENDEUR']}><MesProduits /></ProtectedRoute>
              } />

              {/* Acheteur */}
              <Route path="/acheteur/mes-encheres" element={
                <ProtectedRoute roles={['ACHETEUR']}><MesEncheres /></ProtectedRoute>
              } />

              {/* Admin */}
              <Route path="/admin" element={
                <ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/admin/valider" element={
                <ProtectedRoute roles={['ADMIN']}><ValidateProduits /></ProtectedRoute>
              } />

              {/* 404 */}
              <Route path="*" element={
                <div className="text-center py-20 text-gray-400">
                  <h2 className="text-3xl font-bold">404</h2>
                  <p>Page introuvable</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
