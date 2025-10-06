# CheckingIn - Wellness Dashboard

A comprehensive wellness tracking application that helps you monitor your health data and gain insights into your wellness journey.

## 🚀 Live Application

**Try the app now:** [https://checking-in.replit.app/](https://checking-in.replit.app/)

## ✨ Features

- **Health Data Upload**: Upload screenshots of your health data from various fitness and health apps
- **AI-Powered Analysis**: Get intelligent insights from your health data using Gemini Vision AI
- **Wellness Dashboard**: Track your progress with an intuitive dashboard
- **Journal Entries**: Keep a personal wellness journal
- **Guidance & Insights**: Receive personalized wellness recommendations
- **Authentication**: Secure user authentication with Replit Auth

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma with SQLite
- **AI**: Google Gemini Vision API
- **Authentication**: Replit Auth
- **Deployment**: Replit

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AkritiKeswani/checkingIn.git
cd checkingIn
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your API keys to .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

1. **Sign up/Login**: Create an account or sign in with your existing credentials
2. **Upload Health Data**: Take screenshots of your health app data and upload them
3. **View Analysis**: Get AI-powered insights about your wellness trends
4. **Track Progress**: Use the dashboard to monitor your health journey
5. **Journal**: Keep personal notes about your wellness journey

## 🔧 Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── analysis/          # Analysis page
│   ├── guidance/          # Guidance page
│   ├── journal/           # Journal page
│   └── upload/            # Upload page
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/                # Database schema
└── public/                # Static assets
```

### Key Features Implementation
- **AI Analysis**: Uses Gemini Vision API to analyze health screenshots
- **Database**: Prisma ORM with SQLite for data persistence
- **Authentication**: Replit Auth integration for user management
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live App**: [https://checking-in.replit.app/](https://checking-in.replit.app/)
- **GitHub Repository**: [https://github.com/AkritiKeswani/checkingIn](https://github.com/AkritiKeswani/checkingIn)
