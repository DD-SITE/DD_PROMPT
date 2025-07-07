import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      // Add GitHub ID or Google ID to session.user
      session.user.id = token.sub;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }) {
      // Store access token from provider
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },

  // Optional: you can define a custom sign-in page
  // pages: {
  //   signIn: "/your-custom-signin",
  // },
};

export default NextAuth(authOptions);
