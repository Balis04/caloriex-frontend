import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function AuthRedirect() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      if (isLoading) return;
      if (!isAuthenticated) return;

      const token = await getAccessTokenSilently();

      const res = await fetch("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 404) {
        navigate("/onboarding", { replace: true });
        return;
      }

      if (res.ok) {
        navigate("/profile", { replace: true });
        return;
      }
    };

    run();
  }, [isAuthenticated, getAccessTokenSilently, navigate, isLoading]);

  return <div>Loading...</div>;
}
