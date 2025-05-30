import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Eye, EyeOff, Settings2 } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface GameSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onLeaveTable: () => void;
}

interface Settings {
  soundEnabled: boolean;
  showCards: boolean;
  autoMuck: boolean;
  confirmAllIn: boolean;
  showTimer: boolean;
  showPotOdds: boolean;
}

const GameSettings: React.FC<GameSettingsProps> = ({ isOpen, onClose, onLeaveTable }) => {
  const [settings, setSettings] = useState<Settings>({
    soundEnabled: true,
    showCards: true,
    autoMuck: true,
    confirmAllIn: true,
    showTimer: true,
    showPotOdds: true
  });

  const handleSettingChange = (key: keyof Settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const SettingToggle: React.FC<{
    label: string;
    value: boolean;
    onChange: () => void;
    icon: React.ReactNode;
  }> = ({ label, value, onChange, icon }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-gray-200">{label}</span>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? 'bg-accent-500' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <Card className="w-96">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Settings2 className="w-5 h-5" />
                  Game Settings
                </h3>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <SettingToggle
                  label="Sound Effects"
                  value={settings.soundEnabled}
                  onChange={() => handleSettingChange('soundEnabled')}
                  icon={settings.soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-accent-400" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-gray-400" />
                  )}
                />

                <SettingToggle
                  label="Show Cards"
                  value={settings.showCards}
                  onChange={() => handleSettingChange('showCards')}
                  icon={settings.showCards ? (
                    <Eye className="w-5 h-5 text-accent-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                />

                <SettingToggle
                  label="Auto Muck Losing Hands"
                  value={settings.autoMuck}
                  onChange={() => handleSettingChange('autoMuck')}
                  icon={<Settings2 className="w-5 h-5 text-accent-400" />}
                />

                <SettingToggle
                  label="Confirm All-In"
                  value={settings.confirmAllIn}
                  onChange={() => handleSettingChange('confirmAllIn')}
                  icon={<Settings2 className="w-5 h-5 text-accent-400" />}
                />

                <SettingToggle
                  label="Show Action Timer"
                  value={settings.showTimer}
                  onChange={() => handleSettingChange('showTimer')}
                  icon={<Settings2 className="w-5 h-5 text-accent-400" />}
                />

                <SettingToggle
                  label="Show Pot Odds"
                  value={settings.showPotOdds}
                  onChange={() => handleSettingChange('showPotOdds')}
                  icon={<Settings2 className="w-5 h-5 text-accent-400" />}
                />
              </div>

              <div className="mt-8 pt-4 border-t border-gray-700">
                <Button
                  variant="secondary"
                  onClick={onLeaveTable}
                  className="w-full text-red-400 hover:bg-red-500/10"
                >
                  Leave Table
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameSettings; 