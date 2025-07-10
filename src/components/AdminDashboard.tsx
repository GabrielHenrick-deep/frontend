import React, { useEffect, useState } from 'react';
import { LogOut, Shield } from 'lucide-react';
import { TabSwitcher } from './TabSwitcher';
import { MembersTable } from './MembersTable';
import { ProjectTable } from './ProjectTable';
import { ImageManager } from './ImageManager';
import { TabType } from '../types';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/logout';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('members');
  const [projectData, setProjectsData] = useState(null);
  useEffect(() =>{
    fetch('htpp://localhost:8000/api')
    .then(reponse => reponse.json())
    .then(data => setProjectsData(data))
    .catch(error => console.error('Erro:', error))
  }, []);
 
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'members':
        return <MembersTable />;
      case 'projects':
        return <ProjectTable />;
      case 'imageManager':
        return <ImageManager />;
      default:
        return <MembersTable />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Header */}
      <header className="bg-zinc-950 shadow-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-lg shadow">
                 <img
                src="http://localhost:8000/storage/logo/LogoGRVA_secundaria_fundo_escuro.svg"
                className="h-20 w-20"
                alt="Logo"
              />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-zinc-100">Admin Dashboard</h1>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-zinc-200 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Tab Navigation */}
          <div className="flex justify-center">
            <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Tab Content */}
          <div className="bg-zinc-950 rounded-lg shadow-lg p-6 border border-zinc-800">
            {renderActiveTab()}
          </div>
        </div>
      </main>
    </div>
  );
};