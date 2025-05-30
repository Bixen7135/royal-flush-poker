import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Rule } from '../../types';

type RuleCardProps = {
  rule: Rule;
};

const RuleCard: React.FC<RuleCardProps> = ({ rule }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-glow-sm">
      <div 
        className="px-6 py-4 flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h3 className="text-xl font-serif font-medium text-accent-400">{rule.title}</h3>
        <div className="text-gray-400">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      <div 
        className={`px-6 pb-4 transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pt-2 border-t border-gray-700">
          <p className="text-gray-300 whitespace-pre-line">{rule.content}</p>
        </div>
      </div>
    </div>
  );
};

export default RuleCard;