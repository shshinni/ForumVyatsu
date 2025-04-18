import { createRootRoute, Outlet } from "@tanstack/react-router";
import { UserProvider } from "../context/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../providers/AuthProvider";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <UserProvider>
      <AuthProvider>
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
          <Header />
          <main className="py-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </UserProvider>
  );
}
