import { useSession } from "next-auth/react";

export function AuthCheck({ children }) {
  const env = process.env.NODE_ENV;
  const { data: session, status } = useSession({
    required: true,
    // required: env === "production",
  });
  const isUser = !!session?.user;

  if (isUser || env === "development") {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>carregando</div>;
}
