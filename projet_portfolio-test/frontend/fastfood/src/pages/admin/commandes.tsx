import { useEffect, useState } from "react";
import { apiService } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";
import "./commandes.css";

interface Commande {
  _id: string;
  user: { firstName: string; lastName: string };
  plats: { name: string; price: number }[];
  total: number;
  createdAt: string;
  status: string;
}

const AdminCommandes = () => {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommandes = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiService.get("/commandes/admin");
        setCommandes(res.data);
      } catch (err) {
        if (
          err &&
          typeof err === 'object' &&
          'response' in err &&
          err.response &&
          typeof err.response === 'object' &&
          'data' in err.response &&
          err.response.data &&
          typeof err.response.data === 'object' &&
          'message' in err.response.data
        ) {
          setError((err.response.data as { message: string }).message);
        } else {
          setError("Erreur lors du chargement des commandes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCommandes();
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center py-8 gap-8 bg-gray-100 min-h-svh">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Commandes des clients</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : commandes.length === 0 ? (
          <div>Aucune commande trouvée.</div>
        ) : (
          <div className="w-full max-w-4xl space-y-6">
            {commandes.map((commande) => (
              <div key={commande._id} className="bg-white rounded shadow p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Client :</span> {commande.user ? `${commande.user.firstName} ${commande.user.lastName}` : "-"}
                  <span className="text-sm text-gray-500">{new Date(commande.createdAt).toLocaleString()}</span>
                </div>
                <div>
                  <span className="font-semibold">Plats :</span>
                  <ul className="list-disc ml-6">
                    {commande.plats.map((plat, idx) => (
                      <li key={idx}>{plat.name} - {plat.price.toFixed(2)} €</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Total :</span> {commande.total.toFixed(2)} €
                </div>
                <div className="mt-1 text-sm text-gray-600">Statut : {commande.status}</div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default AdminCommandes;
