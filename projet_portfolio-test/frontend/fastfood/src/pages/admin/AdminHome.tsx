import Header from "@/components/HeaderAdmin";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="flex flex-col items-center py-8 gap-8 bg-gray-100 min-h-svh">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Espace Administrateur</h1>
        <p className="text-lg text-gray-700 mb-4">Bienvenue sur le tableau de bord admin. Ici, vous pouvez gérer les menus, plats et commandes.</p>
        <div className="flex flex-wrap gap-8 justify-center">
          <div onClick={() => navigate("/admin/ingredients")} className="cursor-pointer hover:scale-105 transition-transform">
            <Card
              title="Ingrédients"
              description="Gérez la liste des ingrédients du restaurant."
              image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
            />
          </div>
          <div onClick={() => navigate("/admin/plats")} className="cursor-pointer hover:scale-105 transition-transform">
            <Card
              title="Plats"
              description="Gérez les plats proposés à la carte."
              image="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80"
            />
          </div>
          <div onClick={() => navigate("/admin/commandes")} className="cursor-pointer hover:scale-105 transition-transform">
            <Card
              title="Commandes"
              description="Gérez les commandes des clients."
              image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminHome;
