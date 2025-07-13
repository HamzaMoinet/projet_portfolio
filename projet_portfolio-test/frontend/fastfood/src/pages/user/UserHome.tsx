import Header from "@/components/HeaderUser";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Hero from "@/components/HeroUser";

const plats = [
	{
		title: "Burgers",
		description:
			"Un burger au choix, frites croustillantes et boisson fraîche.",
		image:
			"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
	},
	{
		title: "Smash Burgers",
		description:
			"Un burger au choix, frites croustillantes et boisson fraîche.",
		image:
			"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
	},

];

const Home_User = () => (
	<>
		<Header />
		<Hero />
		<main className="flex flex-col items-center gap-8 bg-yellow-50 min-h-svh" style={{ background: "#e65100"}}>
			<section className="py-10 px-4 flex flex-wrap justify-center gap-8 bg-white w-full" style={{ background: "#e65100"}}>
				{plats.map((plat, idx) => (
					<Card
						key={idx}
						title={plat.title}
						description={plat.description}
						image={plat.image}
					/>
				))}
			</section>
		</main>
		<Footer />
	</>
);

export default Home_User;
