import api from './axios';
import type { EnchereDetail } from '../types';

export const enchereApi = {
  getEnchere: (id: number) =>
    api.get<EnchereDetail>(`/encheres/${id}`),

  getMesEncheres: () =>
    api.get<EnchereDetail[]>('/encheres/mes-encheres'),

  inscrire: (id: number) =>
    api.post<string>(`/encheres/${id}/inscrire`),

  placerOffre: (id: number, montant: number) =>
    api.post<string>(`/encheres/${id}/offre`, { montant }),
};
