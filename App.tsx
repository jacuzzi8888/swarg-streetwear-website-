import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { UpcomingItemCard } from './components/UpcomingItemCard';
import { MagazineArticle } from './components/MagazineArticle';
import { VisualizeModal } from './components/VisualizeModal';
import { AdminEditModal } from './components/AdminEditModal';
import { Page, type Category, type Product, type UpcomingItem, type MagazineArticle as MagazineArticleType, type EditableItem, type AdminUser } from './types';
import { PRODUCTS, UPCOMING_ITEMS, MAGAZINE_ARTICLES, ADMIN_USERS } from './constants';
import { GoogleGenAI, Modality } from '@google/genai';

// New Admin Pages and Components
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUpcoming from './pages/AdminUpcoming';
import AdminMagazine from './pages/AdminMagazine';
import AdminUsers from './pages/AdminUsers';
import { authService } from './services/auth';

// --- PUBLIC FACING PAGES ---

const PublicSite: React.FC<{
    products: Product[];
    upcomingItems: UpcomingItem[];
    magazineArticles: MagazineArticleType[];
    onAddToCart: () => void;
    onVisualize: (product: Product) => void;
}> = ({ products, upcomingItems, magazineArticles, onAddToCart, onVisualize }) => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Store);

    const renderPage = () => {
      switch (currentPage) {
        case Page.Store:
          return <StorePage products={products} onAddToCart={onAddToCart} onVisualize={onVisualize} />;
        case Page.Upcoming:
          return <UpcomingPage items={upcomingItems} />;
        case Page.Magazine:
          return <MagazinePage articles={magazineArticles} />;
        default:
          return <StorePage products={products} onAddToCart={onAddToCart} onVisualize={onVisualize} />;
      }
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={0} />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};


interface StorePageProps {
  products: Product[];
  onAddToCart: () => void;
  onVisualize: (product: Product) => void;
}

const StorePage: React.FC<StorePageProps> = ({ products, onAddToCart, onVisualize }) => {
    const [selectedCategory, setSelectedCategory] = useState<Category>('All');
    const categories: Category[] = ['All', 'Hoodies', 'Tees', 'Pants', 'Accessories'];
  
    const filteredProducts = useMemo(() => {
      if (selectedCategory === 'All') {
        return products;
      }
      return products.filter(p => p.category === selectedCategory);
    }, [selectedCategory, products]);
  
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
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onVisualize={onVisualize} />
            ))}
        </div>
      </>
    );
};
  
const UpcomingPage: React.FC<{ items: UpcomingItem[] }> = ({ items }) => (
    <>
        <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">Coming Soon</h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Be the first to know about our upcoming drops.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {items.map(item => (
                <UpcomingItemCard key={item.id} item={item} />
            ))}
        </div>
    </>
);

const MagazinePage: React.FC<{ articles: MagazineArticleType[] }> = ({ articles }) => (
    <>
        <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">The Journal</h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Inside the world of AURA. Editorials, lookbooks, and behind the scenes.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:gap-12">
            {articles.map(article => (
                <MagazineArticle key={article.id} article={article} />
            ))}
        </div>
    </>
);

// --- MAIN APP ROUTER ---

const App: React.FC = () => {
    const [path, setPath] = useState(window.location.pathname);
    
    // Data State (Centralized Store)
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [upcomingItems, setUpcomingItems] = useState<UpcomingItem[]>(UPCOMING_ITEMS);
    const [magazineArticles, setMagazineArticles] = useState<MagazineArticleType[]>(MAGAZINE_ARTICLES);
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>(ADMIN_USERS);

    // Cart State
    const [cartCount, setCartCount] = useState(0);

    // Modal States
    const [editingItem, setEditingItem] = useState<EditableItem | null>(null);
    const [visualizeModalState, setVisualizeModalState] = useState({
        isOpen: false, isLoading: false, imageUrl: '', error: '', productName: ''
    });

    // Simple routing effect
     useEffect(() => {
        const onLocationChange = () => setPath(window.location.pathname);
        window.addEventListener('popstate', onLocationChange);
        
        // Handle custom navigation
        const originalPushState = history.pushState;
        history.pushState = function() {
            originalPushState.apply(this, arguments);
            onLocationChange();
        };

        return () => {
            window.removeEventListener('popstate', onLocationChange);
            history.pushState = originalPushState;
        };
    }, []);

    const navigate = (newPath: string) => {
        window.history.pushState({}, '', newPath);
        setPath(newPath);
    };

    const handleAddToCart = () => {
      setCartCount(prevCount => prevCount + 1);
      alert('Item added to cart!');
    };
    
    const handleVisualize = async (product: Product) => {
        setVisualizeModalState({ isOpen: true, isLoading: true, imageUrl: '', error: '', productName: product.name });
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `A high-fashion streetwear model wearing a ${product.name} (${product.category}), full body shot, standing in a minimalist, well-lit studio. Photorealistic style.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: { responseModalities: [Modality.IMAGE] },
            });
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
                    setVisualizeModalState(prev => ({ ...prev, isLoading: false, imageUrl: imageUrl, error: '' }));
                    return;
                }
            }
            throw new Error('Image data not found in API response.');
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setVisualizeModalState(prev => ({ ...prev, isLoading: false, error: `Failed to generate image. ${errorMessage}` }));
        }
    };

    const handleCloseVisualizeModal = () => setVisualizeModalState({ isOpen: false, isLoading: false, imageUrl: '', error: '', productName: '' });
    
    // --- Admin Data Handlers ---
    const handleSaveItem = (updatedItem: EditableItem) => {
        if ('price' in updatedItem) {
            setProducts(prev => prev.map(p => p.id === updatedItem.id ? updatedItem : p));
        } else if ('description' in updatedItem) {
            setUpcomingItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
        } else if ('subtitle' in updatedItem) {
            setMagazineArticles(prev => prev.map(a => a.id === updatedItem.id ? updatedItem : a));
        }
        setEditingItem(null);
    };
    const handleDeleteItem = (itemToDelete: EditableItem) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        if ('price' in itemToDelete) {
            setProducts(prev => prev.filter(p => p.id !== itemToDelete.id));
        } else if ('description' in itemToDelete) {
            setUpcomingItems(prev => prev.filter(i => i.id !== itemToDelete.id));
        } else if ('subtitle' in itemToDelete) {
            setMagazineArticles(prev => prev.filter(a => a.id !== itemToDelete.id));
        }
    };
    const handleSaveUser = (updatedUser: AdminUser) => {
        setAdminUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    // --- Render based on path ---
    const renderContent = () => {
        if (path.startsWith('/admin')) {
            const adminProps = {
                products, upcomingItems, magazineArticles, adminUsers,
                onSaveItem: handleSaveItem,
                onDeleteItem: handleDeleteItem,
                onSaveUser: handleSaveUser,
                navigate
            };
            return (
                <Routes>
                    <Route path="/admin/login" element={<AdminLogin navigate={navigate} />} />
                    {/* FIX: The nested routing structure was flawed. Flattening the routes and wrapping each protected component individually ensures authentication is checked correctly for each admin page. */}
                    <Route path="/admin/dashboard" element={<ProtectedRoute navigate={navigate}><AdminLayout navigate={navigate}><AdminDashboard {...adminProps} /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/products" element={<ProtectedRoute navigate={navigate}><AdminLayout navigate={navigate}><AdminProducts {...adminProps} /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/upcoming" element={<ProtectedRoute navigate={navigate}><AdminLayout navigate={navigate}><AdminUpcoming {...adminProps} /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/magazine" element={<ProtectedRoute navigate={navigate}><AdminLayout navigate={navigate}><AdminMagazine {...adminProps} /></AdminLayout></ProtectedRoute>} />
                    <Route path="/admin/users" element={<ProtectedRoute navigate={navigate}><AdminLayout navigate={navigate}><AdminUsers {...adminProps} /></AdminLayout></ProtectedRoute>} />
                </Routes>
            );
        }
        return <PublicSite products={products} upcomingItems={upcomingItems} magazineArticles={magazineArticles} onAddToCart={handleAddToCart} onVisualize={handleVisualize} />;
    };

    // Simple Router Components for readability
    const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const childrenArray = React.Children.toArray(children);
        const matchedChild = childrenArray.find(child => {
            if (React.isValidElement(child)) {
                // FIX: Cast child.props to a known type to safely access the 'path' property, resolving a TypeScript error.
                const childProps = child.props as { path: string };
                return path === childProps.path || (childProps.path.endsWith('*') && path.startsWith(childProps.path.slice(0, -1)))
            }
            return false;
        });

        // Redirect logic
        if (path === '/admin' || path === '/admin/') {
             navigate('/admin/dashboard');
             return null;
        }

        return <>{matchedChild || <p>404 Not Found</p>}</>;
    };
    const Route: React.FC<{ path: string, element: React.ReactNode, children?: React.ReactNode }> = ({ element, children }) => <>{element}{children}</>;
  
    return (
      <>
        <VisualizeModal 
            isOpen={visualizeModalState.isOpen}
            onClose={handleCloseVisualizeModal}
            isLoading={visualizeModalState.isLoading}
            imageUrl={visualizeModalState.imageUrl}
            error={visualizeModalState.error}
            productName={visualizeModalState.productName}
        />
        {/* The Admin Edit modal is now managed within the admin pages */}
        {renderContent()}
      </>
    );
};
  
export default App;