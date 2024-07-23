import { SiteFooter } from "@/components/static/Footer";
import Hero from "@/components/static/Hero";
import Navbar from "@/components/static/Navbar";

const App = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
      </main>
      <footer>
        <SiteFooter />
      </footer>
    </div>
  );
};

export default App;
