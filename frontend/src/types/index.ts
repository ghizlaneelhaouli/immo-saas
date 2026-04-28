export type Role = 'VENDEUR' | 'ACHETEUR' | 'ADMIN';
export type ProductStatus = 'EN_ATTENTE' | 'ACTIF' | 'REJETE';
export type EnchereStatus = 'EN_COURS' | 'TERMINEE';

export interface AuthUser {
  email: string;
  nom: string;
  role: Role;
  token: string;
  refreshToken: string;
}

export interface ProduitPublic {
  id: number;
  titre: string;
  description: string;
  prixBase: number;
  images: string[];
  dateFinEnchere: string | null;
  meilleureOffre: number | null;
  nombreParticipants: number;
  statutEnchere: EnchereStatus | null;
}

export interface ProduitAdmin {
  id: number;
  titre: string;
  description: string;
  prixBase: number;
  images: string[];
  statut: ProductStatus;
  motifRejet: string | null;
  fraisPayes: boolean;
  dateCreation: string;
  vendeurId: number;
  vendeurNom: string;
  vendeurEmail: string;
}

export interface OffreDTO {
  montant: number;
  dateOffre: string;
}

export interface EnchereDetail {
  id: number;
  produitId: number;
  produitTitre: string;
  prixBase: number;
  dateDebut: string;
  dateFin: string;
  statut: EnchereStatus;
  meilleureOffre: number | null;
  nombreParticipants: number;
  offres: OffreDTO[];
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
