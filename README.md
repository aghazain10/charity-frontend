**2. Create `README.md` for Nuxt Frontend:**

````markdown
# Charity Website - Nuxt 3 Frontend

A modern, responsive charity donation platform frontend built with Nuxt 3, TypeScript, and Tailwind CSS.

## 🎨 Features

- **Responsive Design** with Tailwind CSS
- **Type-safe** with TypeScript
- **State Management** with Pinia
- **Authentication** with Laravel Sanctum
- **Campaign Browsing & Creation**
- **Donation System**
- **SEO Optimized** with Nuxt 3 SSR

## 📋 Requirements

- Node.js >= 18
- NPM or Yarn
- Laravel backend running

## 🛠️ Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/aghazain10/charity-frontend.git
    cd charity-frontend
    Install dependencies
    ```

bash
npm install

# or

yarn install
Configure environment

bash
cp .env.example .env
Update .env file

env
API_BASE_URL=http://localhost:8000/api
NUXT_PUBLIC_SITE_URL=http://localhost:3000
Start development server

bash
npm run dev

# or

yarn dev
Open in browser

text
http://localhost:3000
📁 Project Structure
text
├── assets/ # Static assets (images, fonts)
├── components/ # Reusable Vue components
├── composables/ # Composable functions (useApi, useAuth)
├── layouts/ # Layout components
├── middleware/ # Route middleware
├── pages/ # Application pages (auto-routed)
├── public/ # Public static files
├── stores/ # Pinia stores (auth, campaign)
├── types/ # TypeScript type definitions
├── utils/ # Utility functions
└── nuxt.config.ts # Nuxt configuration
🧩 Key Components
Authentication System
composables/useApi.ts - API client with interceptors

stores/auth.ts - Authentication store (Pinia)

middleware/auth.ts - Route guards

Campaign Features
stores/campaign.ts - Campaign state management

components/CampaignCard.vue - Campaign display card

pages/campaigns/[id].vue - Single campaign page

Donation System
components/DonationForm.vue - Donation form

composables/usePayment.ts - Payment integration

🎨 UI/UX Features
Dark/Light mode (if implemented)

Loading states and skeletons

Toast notifications

Form validation

Image optimization

Mobile-first responsive design

🚀 Build & Deployment
bash

# Build for production

npm run build

# Preview production build

npm run preview

# Generate static site

npm run generate
Deploy to Vercel/Netlify
Connect your GitHub repository

Set environment variables

Deploy automatically on push

🧪 Testing
bash

# Run unit tests

npm run test:unit

# Run component tests

npm run test:component

# Run e2e tests

npm run test:e2e
🔧 Development
Code Style
ESLint for code linting

Prettier for formatting

TypeScript for type safety

Git Hooks
Pre-commit: Lint and format

Pre-push: Run tests

📄 License
MIT License

👤 Author
Zain Rizvee

GitHub: @aghazain10
````
