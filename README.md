# IMMO SAAS — Plateforme d'enchères immobilières

## Description

Application web d'enchères en ligne pour biens immobiliers avec trois acteurs :
- **Vendeur** : soumet des produits à vendre, suit les statuts
- **Acheteur** : s'inscrit aux enchères, place des offres en temps réel (WebSocket)
- **Admin** : valide/rejette les produits, supervise la plateforme

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Backend | Spring Boot 3.2, Java 17 |
| Base de données | PostgreSQL 15 + Flyway |
| Sécurité | Spring Security + JWT (JJWT 0.12) |
| Temps réel | WebSocket / STOMP |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| État client | Zustand + React Query |
| Conteneurs | Docker + Docker Compose |
| API docs | Swagger UI (SpringDoc OpenAPI) |

## Prérequis

- Docker Desktop 4.x+
- Git

## Démarrage rapide (Docker)

```bash
# Cloner le repo
git clone <url-du-repo>
cd immo-saas

# Lancer tous les services
docker compose up --build

# Accès
# Frontend  : http://localhost:5173
# Backend   : http://localhost:8080
# Swagger   : http://localhost:8080/swagger-ui.html
```

## Développement local

### Backend

```bash
# Démarrer seulement PostgreSQL
docker compose up postgres -d

# Lancer le backend
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## Identifiants par défaut

| Compte | Email | Mot de passe |
|--------|-------|--------------|
| Admin | admin@immosaas.ma | Admin@2024! |

## Variables d'environnement

Créez un fichier `.env` à la racine pour personnaliser :

```env
MAIL_USERNAME=votre@gmail.com
MAIL_PASSWORD=mot_de_passe_application_gmail
JWT_SECRET=votre-secret-jwt-tres-long-256-bits-minimum
```

## Architecture (Clean Architecture)

```
backend/
├── domain/          # Entités JPA + Enums (couche centrale)
├── repository/      # Interfaces Spring Data
├── service/         # Interfaces (OCP/DIP) + implementations (SRP)
├── controller/      # Couche HTTP REST
├── security/        # JWT filter + UserDetails
├── config/          # Spring Security, WebSocket, DataInitializer
├── scheduler/       # Cloture automatique des enchères (toutes les heures)
├── exception/       # GlobalExceptionHandler
└── dto/             # DTOs request/response (séparation des couches)

frontend/
├── api/             # Appels HTTP Axios
├── store/           # Zustand (état d'authentification persisté)
├── hooks/           # useAuth, useEnchereSocket (WebSocket STOMP)
├── pages/           # Pages par rôle (auth, public, vendeur, acheteur, admin)
└── components/      # Composants réutilisables (layout, product, enchere)
```

## Principes SOLID respectés

- **SRP** : chaque service a une seule responsabilité (Auth ≠ Product ≠ Enchere ≠ Email)
- **OCP** : interfaces service extensibles sans modification des contrôleurs
- **DIP** : injection par constructeur via `@RequiredArgsConstructor`
- **Sécurité données** : `ProduitPublicDTO` ne contient jamais les infos du vendeur
- **Validation** : toutes les offres validées côté serveur (montant > prixBase et > meilleureOffre)

## Conventions de commit Git

```
feat:  nouvelle fonctionnalité
fix:   correction de bug
chore: maintenance (configs, deps)
docs:  documentation
test:  tests
```

## API Endpoints principaux

| Méthode | Endpoint | Rôle |
|---------|----------|------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/produits | Public |
| GET | /api/produits/{id} | Public |
| POST | /api/produits/soumettre | VENDEUR |
| GET | /api/encheres/{id} | Public |
| POST | /api/encheres/{id}/inscrire | ACHETEUR |
| POST | /api/encheres/{id}/offre | ACHETEUR |
| GET | /api/admin/produits/en-attente | ADMIN |
| PATCH | /api/admin/produits/{id}/statut | ADMIN |

## WebSocket

Souscription temps réel aux offres :
```
ws://localhost:8080/ws
Topic : /topic/encheres/{enchereId}
```
