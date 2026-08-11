import React, { useState } from 'react';
import { Brain, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminRecommendationsView: React.FC = () => {
  const { showToast } = useApp();

  const [brandWeight, setBrandWeight] = useState(40);
  const [styleWeight, setStyleWeight] = useState(35);
  const [priceWeight, setPriceWeight] = useState(25);

  const handleSaveWeights = () => {
    showToast('AI Style Matching weights recalibrated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">AI Recommendation Engine Performance</h2>
        <p className="text-xs text-slate-400">Personalization click-through rates, style accuracy, and weight controls</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Recommendation CTR</span>
          <span className="text-2xl font-bold text-sky-400 font-mono">18.6%</span>
          <span className="text-[10px] text-emerald-400 block mt-1">+3.2% vs standard catalog</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Style Match Score Accuracy</span>
          <span className="text-2xl font-bold text-purple-400 font-mono">94.8%</span>
          <span className="text-[10px] text-slate-400 block mt-1">Based on 1,240 user sessions</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-xs text-slate-400 block mb-1">Outfit Studio Conversion Uplift</span>
          <span className="text-2xl font-bold text-indigo-400 font-mono">+28.4%</span>
          <span className="text-[10px] text-emerald-400 block mt-1">Higher average cart value</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-100">AI Personalization Sensitivity Controls</h3>
            <p className="text-xs text-slate-400">Adjust parameters used in generating user style archetype matches</p>
          </div>
        </div>

        <div className="space-y-4 max-w-lg">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Brand Affinity Weight</span>
              <span className="text-indigo-400 font-mono">{brandWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={brandWeight}
              onChange={e => setBrandWeight(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Style Archetype Match Weight</span>
              <span className="text-indigo-400 font-mono">{styleWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={styleWeight}
              onChange={e => setStyleWeight(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Price Bracket Proximity Weight</span>
              <span className="text-indigo-400 font-mono">{priceWeight}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={priceWeight}
              onChange={e => setPriceWeight(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          <button
            onClick={handleSaveWeights}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20"
          >
            Apply Algorithm Recalibration
          </button>
        </div>
      </div>
    </div>
  );
};
