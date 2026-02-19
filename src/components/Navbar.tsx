import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid gray" }}>
      {isAuthenticated ? (
        <>
          <span>{user?.email}</span>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </nav>
  );
}
