
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MembersPage } from './pages/MembersPage';
import { MemberProfile } from './pages/MemberProfile';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectsProfile from './pages/ProjectProfile';
import { BlogPage } from './pages/BlogPage';
import { BlogPost } from './pages/BlogPost';

function App() {
  return (
    
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="pt-16 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/blog" element={<BlogPage />} /> 
            <Route path="/blog/:slug" element={<BlogPost />} />            
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/member/:id" element={<MemberProfile />} />
            <Route path="/projects/:id" element={<ProjectsProfile />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    
  );
}

export default App;