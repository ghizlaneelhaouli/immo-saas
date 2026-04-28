import api from './axios';
import type { Page, ProduitAdmin, ProduitPublic } from '../types';

export const productApi = {
  getCatalogue: (page = 0, size = 12) =>
    api.get<Page<ProduitPublic>>('/produits', { params: { page, size } }),

  getDetail: (id: number) =>
    api.get<ProduitPublic>(`/produits/${id}`),

  getMesProduits: () =>
    api.get<ProduitPublic[]>('/produits/mes-produits'),

  soumettre: (formData: FormData) =>
    api.post<{ produitId: number; fraisNecessaires: boolean; montantFrais: number; message: string }>(
      '/produits/soumettre',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ),

  getEnAttente: () =>
    api.get<ProduitAdmin[]>('/admin/produits/en-attente'),

  valider: (id: number, decision: string, motif?: string) =>
    api.patch<string>(`/admin/produits/${id}/statut`, { decision, motif }),
};
