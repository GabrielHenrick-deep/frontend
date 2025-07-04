import React from 'react';
import { Members } from '../types/members';
import { useNavigate } from 'react-router-dom';

interface MemberCardProps {
  member: Members;
}

export function MemberCard({ member }: MemberCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/member/${member.id}`)}
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
    >
      <img 
        src={member.image} 
        alt={member.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <span className="inline-block px-2 py-1 mt-2 text-sm font-medium text-white bg-blue-600 rounded-full">
          {member.category}
        </span>
      </div>
    </div>
  );
}