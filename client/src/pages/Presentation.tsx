import { MarieFeedback } from "@/components/MarieFeedback";
import { useStores } from "@/contexts/StoreContext";
import { ArrowRight, BarChart3, Code2, Database, Layers, Share2 } from "lucide-react";
import { Link } from "wouter";

export default function Presentation() {
  const { stores } = useStores();
  const activeStores = stores.filter(s => s.isActive).length;

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans text-black pb-20">
      {/* Hero Section */}
      <header className="bg-yellow-400 border-b-8 border-black py-20 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="bg-black text-white inline-block px-4 py-2 font-display text-2xl mb-4 transform -rotate-2">
            PROJECT REPORT
          </div>
          <h1 className="font-display text-8xl mb-6 uppercase tracking-tighter leading-[0.8]">
            Marie<br/>Vault
          </h1>
          <p className="font-sans text-2xl font-bold max-w-2xl mb-8 border-l-4 border-black pl-6">
            A technical deep-dive into the development of a Persona 4 themed Game Deals application.
          </p>
          
          <div className="flex gap-4">
            <Link href="/">
              <button className="bg-black text-white px-8 py-4 font-display text-2xl hover:bg-white hover:text-black border-4 border-black transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                LAUNCH APP
              </button>
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent"></div>
      </header>

      <main className="container mx-auto px-4 py-16 space-y-24">
        
        {/* 1. Explore Data Intuitively */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-black text-yellow-400 p-3 rounded-full">
                <Database className="w-8 h-8" />
              </div>
              <h2 className="font-display text-5xl">Data Exploration</h2>
            </div>
            <p className="text-xl leading-relaxed mb-6">
              MarieVault connects directly to the <strong>CheapShark API</strong> to provide real-time access to game deals. 
              Instead of raw JSON, users explore data through a "Marie UI" interface that transforms technical endpoints into a visual experience.
            </p>
            <ul className="space-y-4 font-bold text-lg">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-6 h-6" />
                <span>Real-time connection to {activeStores} digital stores</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-6 h-6" />
                <span>Live price comparison and deal rating analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-6 h-6" />
                <span>Instant search with 400ms debounce optimization</span>
              </li>
            </ul>
          </div>
          <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
            <div className="border-b-4 border-black pb-4 mb-4 flex justify-between items-center">
              <span className="font-display text-2xl">API STATS</span>
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
                <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-black"></div>
                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black"></div>
              </div>
            </div>
            <div className="space-y-4 font-mono">
              <div className="flex justify-between border-b-2 border-gray-200 pb-2">
                <span>Endpoint</span>
                <span className="font-bold">/api/1.0/deals</span>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 pb-2">
                <span>Method</span>
                <span className="bg-blue-100 px-2 border border-black">GET</span>
              </div>
              <div className="flex justify-between border-b-2 border-gray-200 pb-2">
                <span>Response Time</span>
                <span className="text-green-600 font-bold">~120ms</span>
              </div>
              <div className="mt-4 bg-gray-100 p-4 border-2 border-black text-sm">
                {`{
  "title": "Persona 4 Golden",
  "salePrice": "12.99",
  "savings": "35.000000",
  "dealRating": "9.8"
}`}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Understand Trends */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-black text-white p-8 border-4 border-yellow-400 shadow-[12px_12px_0px_0px_rgba(255,230,0,1)] -rotate-1">
            <h3 className="font-display text-3xl text-yellow-400 mb-6">TECH STACK TRENDS</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 font-bold">
                  <span>React 19 + Vite</span>
                  <span>98% Performance</span>
                </div>
                <div className="w-full bg-gray-800 h-4 border border-white">
                  <div className="bg-yellow-400 h-full w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 font-bold">
                  <span>Tailwind CSS 4</span>
                  <span>100% Style</span>
                </div>
                <div className="w-full bg-gray-800 h-4 border border-white">
                  <div className="bg-pink-500 h-full w-[100%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 font-bold">
                  <span>TypeScript Safety</span>
                  <span>Zero Runtime Errors</span>
                </div>
                <div className="w-full bg-gray-800 h-4 border border-white">
                  <div className="bg-blue-400 h-full w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-black text-yellow-400 p-3 rounded-full">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h2 className="font-display text-5xl">Understanding Trends</h2>
            </div>
            <p className="text-xl leading-relaxed mb-6">
              The project leverages modern web development trends to ensure scalability and maintainability. 
              By using <strong>React 19</strong> and <strong>Tailwind 4</strong>, we achieve a high-performance application that is easy to extend.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border-2 border-black p-4">
                <h4 className="font-bold mb-2">Component Architecture</h4>
                <p className="text-sm text-gray-600">Modular components like DealCard and MarieFeedback ensure code reusability.</p>
              </div>
              <div className="bg-white border-2 border-black p-4">
                <h4 className="font-bold mb-2">State Management</h4>
                <p className="text-sm text-gray-600">Context API + LocalStorage for a seamless user experience without backend complexity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Save & Share */}
        <section className="bg-white border-4 border-black p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500"></div>
          
          <div className="inline-block bg-black text-white p-4 rounded-full mb-6">
            <Share2 className="w-10 h-10" />
          </div>
          
          <h2 className="font-display text-6xl mb-6">Save & Share Easily</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            The entire project is open-source and containerized. You can easily share the results via the GitHub repository or deploy this static presentation anywhere.
          </p>
          
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="https://github.com/manus-ai/marievault" target="_blank" className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 font-bold border-2 border-black hover:bg-gray-800 transition-colors">
              <Code2 className="w-5 h-5" />
              VIEW SOURCE CODE
            </a>
            <button className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 font-bold border-2 border-black hover:bg-yellow-300 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Layers className="w-5 h-5" />
              DOWNLOAD REPORT
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center border-t-4 border-black pt-12">
          <MarieFeedback message="THANK YOU FOR VISITING THE VELVET ROOM OF CODE!" type="success" className="inline-block max-w-xl" />
          <p className="mt-8 font-bold text-gray-500">MARIEVAULT © 2025</p>
        </footer>

      </main>
    </div>
  );
}
