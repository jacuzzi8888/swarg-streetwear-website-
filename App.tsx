import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { UpcomingItemCard } from './components/UpcomingItemCard';
import { MagazineArticle } from './components/MagazineArticle';
import { VisualizeModal } from './components/VisualizeModal';
import { Page, type Category, type Product } from './types';
import { PRODUCTS, UPCOMING_ITEMS, MAGAZINE_ARTICLES } from './constants';
import { GoogleGenAI, Modality } from '@google/genai';


interface StorePageProps {
  onAddToCart: () => void;
  onVisualize: (product: Product) => void;
}

const StorePage: React.FC<StorePageProps> = ({ onAddToCart, onVisualize }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');
    const categories: Category[] = ['All', 'Hoodies', 'Tees', 'Pants', 'Accessories'];
  
    const filteredProducts = useMemo(() => {
      if (selectedCategory === 'All') {
        return PRODUCTS;
      }
      return PRODUCTS.filter(p => p.category === selectedCategory);
    }, [selectedCategory]);
  
    return (
      <>
        <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">Latest Collection</h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Explore our curated selection of streetwear essentials.</p>
        </div>

        <div className="my-12">
            <div className="flex justify-center space-x-2 sm:space-x-4">
            {categories.map(category => (
                <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-300 ${
                    selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                >
                {category}
                </button>
            ))}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onVisualize={onVisualize}/>
            ))}
        </div>
      </>
    );
};
  
const UpcomingPage = () => (
    <>
        <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">Coming Soon</h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Be the first to know about our upcoming drops.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {UPCOMING_ITEMS.map(item => (
                <UpcomingItemCard key={item.id} item={item} />
            ))}
        </div>
    </>
);

const MagazinePage = () => (
    <>
        <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">The Journal</h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Inside the world of AURA. Editorials, lookbooks, and behind the scenes.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:gap-12">
            {MAGAZINE_ARTICLES.map(article => (
                <MagazineArticle key={article.id} article={article} />
            ))}
        </div>
    </>
);


const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Store);
    const [cartCount, setCartCount] = useState(0);
    const [modalState, setModalState] = useState({
        isOpen: false,
        isLoading: false,
        imageUrl: '',
        error: '',
        productName: ''
    });

    const handleAddToCart = () => {
      setCartCount(prevCount => prevCount + 1);
      alert('Item added to cart!');
    };
    
    const handleVisualize = async (product: Product) => {
        setModalState({
            isOpen: true,
            isLoading: true,
            imageUrl: '',
            error: '',
            productName: product.name
        });

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `A high-fashion streetwear model wearing a ${product.name} (${product.category}), full body shot, standing in a minimalist, well-lit studio. Photorealistic style.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [{ text: prompt }],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    setModalState(prev => ({ ...prev, isLoading: false, imageUrl: imageUrl, error: '' }));
                    return;
                }
            }
            throw new Error('Image data not found in API response.');

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setModalState(prev => ({ ...prev, isLoading: false, error: `Failed to generate image. ${errorMessage}` }));
        }
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, isLoading: false, imageUrl: '', error: '', productName: '' });
    };
  
    const renderPage = () => {
      switch (currentPage) {
        case Page.Store:
          return <StorePage onAddToCart={handleAddToCart} onVisualize={handleVisualize} />;
        case Page.Upcoming:
          return <UpcomingPage />;
        case Page.Magazine:
          return <MagazinePage />;
        default:
          return <StorePage onAddToCart={handleAddToCart} onVisualize={handleVisualize} />;
      }
    };
  
    return (
      <div className="bg-black min-h-screen text-white">
        <VisualizeModal 
            isOpen={modalState.isOpen}
            onClose={handleCloseModal}
            isLoading={modalState.isLoading}
            imageUrl={modalState.imageUrl}
            error={modalState.error}
            productName={modalState.productName}
        />
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cartCount} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {renderPage()}
        </main>
        <Footer />
      </div>
    );
};
  
export default App;