-- Users
CREATE TABLE users (
    id         BIGSERIAL PRIMARY KEY,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    nom        VARCHAR(255) NOT NULL,
    telephone  VARCHAR(20),
    role       VARCHAR(20)  NOT NULL CHECK (role IN ('VENDEUR', 'ACHETEUR', 'ADMIN')),
    enabled    BOOLEAN      DEFAULT TRUE,
    created_at TIMESTAMP    DEFAULT NOW()
);

-- Produits
CREATE TABLE produits (
    id              BIGSERIAL PRIMARY KEY,
    titre           VARCHAR(255)    NOT NULL,
    description     TEXT,
    prix_base       DECIMAL(10, 2)  NOT NULL,
    statut          VARCHAR(20)     DEFAULT 'EN_ATTENTE' CHECK (statut IN ('EN_ATTENTE', 'ACTIF', 'REJETE')),
    motif_rejet     TEXT,
    frais_payes     BOOLEAN         DEFAULT FALSE,
    vendeur_id      BIGINT          REFERENCES users (id),
    date_creation   TIMESTAMP       DEFAULT NOW(),
    date_validation TIMESTAMP
);

-- Images produits (ElementCollection)
CREATE TABLE produit_images (
    produit_id BIGINT       REFERENCES produits (id) ON DELETE CASCADE,
    image_url  VARCHAR(500)
);

-- Paiements inscription frais 20 DH
CREATE TABLE paiements_inscription (
    id             BIGSERIAL PRIMARY KEY,
    produit_id     BIGINT         REFERENCES produits (id),
    vendeur_id     BIGINT         REFERENCES users (id),
    montant        DECIMAL(10, 2) DEFAULT 20.00,
    statut         VARCHAR(20)    DEFAULT 'PAYE',
    date_paiement  TIMESTAMP      DEFAULT NOW()
);

-- Enchères
CREATE TABLE encheres (
    id          BIGSERIAL PRIMARY KEY,
    produit_id  BIGINT      REFERENCES produits (id) UNIQUE,
    date_debut  TIMESTAMP   NOT NULL,
    date_fin    TIMESTAMP   NOT NULL,
    statut      VARCHAR(20) DEFAULT 'EN_COURS' CHECK (statut IN ('EN_COURS', 'TERMINEE'))
);

-- Participations (unique acheteur par enchère)
CREATE TABLE participations (
    id                BIGSERIAL PRIMARY KEY,
    enchere_id        BIGINT    REFERENCES encheres (id),
    acheteur_id       BIGINT    REFERENCES users (id),
    date_inscription  TIMESTAMP DEFAULT NOW(),
    UNIQUE (enchere_id, acheteur_id)
);

-- Offres
CREATE TABLE offres (
    id          BIGSERIAL PRIMARY KEY,
    enchere_id  BIGINT         REFERENCES encheres (id),
    acheteur_id BIGINT         REFERENCES users (id),
    montant     DECIMAL(10, 2) NOT NULL,
    date_offre  TIMESTAMP      DEFAULT NOW()
);

-- Index performance
CREATE INDEX idx_encheres_statut ON encheres (statut);
CREATE INDEX idx_produits_statut  ON produits (statut);
CREATE INDEX idx_offres_enchere   ON offres (enchere_id, montant DESC);
