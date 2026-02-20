# BIMLO — Système de Vérification Pylônes Télécoms 🏗️

> Plateforme IA de vérification de dossiers techniques pour pylônes télécoms, développée par **Mohamed MESSAOUDI**.

## 📋 Description

BIMLO est une application React/TypeScript qui automatise la vérification des dossiers techniques pylônes télécoms en intégrant l'IA Claude d'Anthropic. Elle couvre l'ensemble du pipeline de validation :

- **WALA** (Ingénieur CAD) — Plans de fabrication PDF + IFC
- **SEIF** (Ingénieur Structure) — Notes de calcul EN1993
- **BIMLO CEO** — Visa final et archivage

## 🚀 Fonctionnalités

- ✅ Checklists de vérification par discipline (CAD, Structure, Direction)
- 🤖 Analyse IA réelle via Claude (Anthropic API)
- 📊 Pipeline visuel de validation avec statuts en temps réel
- 🔒 Workflow séquentiel : chaque étape débloque la suivante
- 📁 Archivage automatique après visa final BIMLO

## 🛠️ Technologies

- React 18 + TypeScript
- Claude API (Anthropic)
- CSS-in-JS (styles inline)
- Normes : EN1991, EN1993, IFC2x3/4, ICPE

## ⚙️ Installation

```bash
git clone https://github.com/mohamedmessaoudi-star/Mohamed-MESSAOUDI.git
cd Mohamed-MESSAOUDI
npm install
```

Créez un fichier `.env` à la racine :
```
REACT_APP_ANTHROPIC_KEY=votre_cle_api_ici
```

```bash
npm start
```

## 📁 Structure du projet

```
├── public/
│   └── index.html
├── src/
│   ├── App.tsx        # Composant principal
│   └── index.tsx      # Point d'entrée
├── .eslintrc.json
├── .gitignore
├── package.json
└── tsconfig.json
```

## ⚠️ Sécurité

Ne jamais commiter le fichier `.env`. Il est exclu par `.gitignore`.

---

**Auteur :** Mohamed MESSAOUDI  
**GitHub :** [mohamedmessaoudi-star](https://github.com/mohamedmessaoudi-star)
