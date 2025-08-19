# DDPROMPT — AI-Powered Prompt-Based Website Code Generator  

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Convex](https://img.shields.io/badge/Convex-Backend-blueviolet?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Sandpack](https://img.shields.io/badge/Sandpack-Enabled-blue?logo=codesandbox&logoColor=white)


---

##  Overview  
**ddprompt** is a full-stack web application that generates complete website code based on user prompts using **Google Gemini API**.  
It provides live previews of both **generated code** and the **rendered webpage**, with options to export files or deploy directly via an integrated sandbox.  

🔗 **Live Demo:** [ddprompt.vercel.app](https://ddprompt.vercel.app)  

---

## ✨ Features  
- 📝 **Prompt-to-Code Generation**: Generate website code files instantly using **Google Gemini API**.  
- 🔍 **Dual Preview Mode**: View both code and the live-rendered website.  
- 📦 **Sandbox Integration**: This project uses [Sandpack](https://sandpack.codesandbox.io/) to provide an in-browser code editor and preview environment.  
- 📂 **File Upload Support**: Upload `.txt` files as input for code generation.  
- ⏳ **Prompt History Sidebar**: Track and reuse your previous prompts.  
- 🔄 **Regeneration Support**: Modify prompts and regenerate code seamlessly.  
- 🔐 **Authentication**: Sign in with **Google** or **GitHub** via NextAuth.  

---

## 🛠️ Tech Stack  

**Frontend**  
- React 19, Next.js 15.3.1, Tailwind CSS 4  
- Radix UI, lucide-react, tw-animate-css  
- React Markdown, Next Themes  

**Backend & APIs**  
- Convex (backend + DB)  
- NextAuth (authentication)  
- Google Gemini API, @react-oauth/google  
- Axios, uuid4, mime  

**Developer Tools**  
- TypeScript 5.8, PostCSS, Next Lint  

**Deployment**  
- Hosted on **Vercel**  

---


## 🎥 Demo Video  

https://github.com/user-attachments/assets/ae3308eb-0af4-4fc4-b6ae-bd5cf233cf4f  

---

## ⚙️ Installation & Setup  

**Clone the repository**
   ```bash
   git clone https://github.com/DD-SITE/DD_PROMPT
   cd DD_PROMPT
```

**Install dependencies:**
   ```bash
npm install
# or
yarn install
```

**Create a .env.local file in the root folder and add your API key:**
```bash
# Convex Deployment
CONVEX_DEPLOYMENT=dev:your-convex-deployment-id
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Gemini API
GEMINI_API_KEY=your-gemini-api-key

```

**Run locally:**
```bash
npm run dev
# or
yarn run dev
```
View the site at `http://localhost:3000` or the port specified in your setup.
