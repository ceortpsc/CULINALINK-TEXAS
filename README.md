# CULINALINKTEXAS
Statewide culinary intelligence, logistics, and resource-linking platform built for Texas food providers, community organizations, and compliance-driven operations. Designed for PrimeWeb and RTPSC enterprise environments.

---

## 🚀 Overview
CULINALINKTEXAS centralizes food-service data, vendor onboarding, licensing verification, and community resource mapping into a unified API-driven system. It supports restaurants, food trucks, farms, nonprofits, and distribution centers across Texas.

---

## 🔧 Core Features
- Vendor onboarding + identity verification  
- Texas food-service licensing lookup  
- Supplier + restaurant directory  
- Community food resource mapping  
- Logistics + distribution coordination  
- Stripe-enabled payment rails  
- Audit-grade PDF output blocks  
- PrimeWeb-compatible UI modules  

---

## 🏗️ Architecture
- **Frontend:** React + PrimeWeb UI components  
- **Backend:** Node.js / Express or FastAPI  
- **Database:** PostgreSQL (primary), Redis (cache)  
- **Auth:** Clerk / Cognito / PrimeWeb IAM  
- **Storage:** S3 buckets (public + private)  
- **PDF Engine:** RTPSC Universal Fill Engine  
- **Integrations:** Stripe, Texas licensing APIs  

---

## 📚 API Modules
- `/vendors` — onboarding, verification  
- `/licenses` — Texas food-service compliance  
- `/directory` — restaurants, farms, suppliers  
- `/resources` — food banks, community centers  
- `/logistics` — routing, distribution, scheduling  

---

## 📦 Deployment
- AWS ECS or Lambda  
- S3 static hosting for frontend  
- CloudFront CDN  
- RDS PostgreSQL  
- IAM role-based access control  

---

## 📝 Development
```bash
npm install
npm run dev

---

# **C. PROJECT STRUCTURE FOR CULINALINKTEXAS (COPY/PASTE)**

```plaintext
CULINALINKTEXAS/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── vendors/
│   │   │   ├── licenses/
│   │   │   ├── directory/
│   │   │   ├── resources/
│   │   │   └── logistics/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── app.js
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── styles/
│   ├── public/
│   └── package.json
│
├── infrastructure/
│   ├── terraform/
│   ├── iam/
│   ├── ecs/
│   ├── rds/
│   └── s3/
│
├── docs/
│   ├── business/
│   ├── api/
│   ├── compliance/
│   └── architecture/
│
└── README.md
CULINALINKTEXAS is a statewide culinary intelligence and resource-linking platform designed to unify Texas food-service operations, community food resources, and compliance systems under one digital ecosystem.

It serves:

Restaurants

Food trucks

Caterers

Farms and suppliers

Nonprofits and food banks

Distribution centers

Municipal and state agencies

The platform provides:

Vendor onboarding

Licensing verification

Directory listings

Logistics coordination

Community resource mapping

Payment processing

Audit-grade reporting

CULINALINKTEXAS operates as a PrimeWeb‑compatible module within the RTPSC enterprise stack, supporting both commercial and nonprofit food-service operations across Texas.

E. TECHNICAL DESCRIPTION (IAM / AWS / APP REGISTRY)
IAM Model
Root Application: CULINALINKTEXAS_APP

Roles:

CULINA_ADMIN — full system access

CULINA_VENDOR — onboarding + directory

CULINA_COMPLIANCE — licensing + audits

CULINA_RESOURCE_COORD — nonprofit + logistics

CULINA_VIEWER — read-only

Policies:

CULINA_S3_READWRITE

CULINA_RDS_ACCESS

CULINA_PDF_ENGINE_EXECUTE

CULINA_STRIPE_TRANSACT

CULINA_LOGISTICS_ROUTE

AWS Architecture
Frontend: S3 + CloudFront

Backend: ECS Fargate or Lambda

Database: RDS PostgreSQL

Cache: Redis (Elasticache)

Storage: S3 buckets

culina-public

culina-private

Secrets: AWS Secrets Manager

Monitoring: CloudWatch + X-Ray

App Registry (AWS Service Catalog)
Application Name: CULINALINKTEXAS

Owner: Ross Tax Pro Software Co.

Environment: Production / Staging / Dev

Tags:

Division=PrimeWeb

Category=Culinary

Region=Texas

Compliance=FoodService
