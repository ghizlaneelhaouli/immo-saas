import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
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
import { Building2 } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <Building2 size={64} className="text-gray-200 mb-4" />
      <h2 className="text-7xl font-bold text-gray-200 mb-2">404</h2>
      <p className="text-xl font-medium text-gray-500 mb-1">Page introuvable</p>
      <p className="text-gray-400 text-sm mb-8">Cette page n'existe pas ou a été déplacée.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
      >
        Retour au catalogue
      </Link>
    </div>
  );
}

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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
