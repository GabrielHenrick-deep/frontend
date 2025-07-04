import React from 'react';
import { Users, Briefcase, Calendar } from 'lucide-react';
import { TabType } from '../types';

interface TabSwitcherProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'users' as TabType, label: 'Members', icon: Users },
    { id: 'projects' as TabType, label: 'Projects', icon: Briefcase },
     { id: 'imageManager' as TabType, label: 'ImageManager', icon: Calendar },
  ];

  return (
    <div className="flex space-x-1 bg-gray-900 rounded-lg p-1">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
            activeTab === id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-white hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Icon size={18} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};