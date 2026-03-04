"use client";

import { Colors,ExternalLinkProps, PopOverProps } from "@/app/Types/Type";

export default function PopoverContent({ data, loading, coords, isSaved, onSave, cleanWord }: PopOverProps) {
  
  // Browser Speech Synthesis ကိုသုံးပြီး အသံထွက်ဖတ်ပေးရန်
  const speakWord = () => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.cancel(); // အရင်ဖတ်နေတာရှိရင် ရပ်ရန်
      const utterance = new SpeechSynthesisUtterance(cleanWord);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (loading) return (
    <div className="fixed z-9999 w-72 bg-slate-900 p-4 rounded-2xl border border-slate-700 shadow-2xl" 
         style={{ bottom: `calc(100vh - ${coords.top}px + 12px)`, left: `${coords.left}px`, transform: 'translateX(-50%)' }}>
      <p className="text-xs text-slate-400 italic font-mono animate-pulse">Searching dictionary...</p>
    </div>
  );

  if (!data) return null;

  // Twinword API တွင် audio မပါနိုင်သဖြင့် DictionaryAPI.dev data ရှိလျှင် ရှာမည်
  const audioObj = data.phonetics?.find((p) => p.audio);

  return (
    <div 
      className="fixed z-9999 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200"
      style={{ bottom: `calc(100vh - ${coords.top}px + 12px)`, left: `${coords.left}px`, transform: 'translateX(-50%)' }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-white leading-none capitalize">{data.word}</h3>
          <p className="text-blue-400 text-xs mt-1 font-mono">{data.phonetic}</p>
        </div>
        <div className="flex gap-2">
          {/* Audio ရှိလျှင် ဖွင့်မည်၊ မရှိလျှင် AI voice ဖြင့် ဖတ်မည် */}
          <button 
            onClick={audioObj ? () => new Audio(audioObj.audio).play() : speakWord} 
            className="p-1.5 bg-blue-500/10 rounded-full text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            🔊
          </button>
          <button onClick={onSave} className={`p-1.5 rounded-full transition-all ${isSaved ? "text-yellow-500 bg-yellow-500/10 scale-110" : "text-slate-400 bg-slate-800"}`}>
            {isSaved ? "⭐" : "📝"}
          </button>
        </div>
      </div>
      
      <hr className="border-slate-800 mb-3" />
      
      <div className="max-h-40 overflow-y-auto pr-1 scrollbar-hide">
        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
          {data.meanings[0]?.partOfSpeech || "word"}
        </p>
        <p className="text-sm text-slate-200 mt-1 leading-relaxed">
          {data.meanings[0]?.definitions[0]?.definition}
        </p>

        {/* Synonyms section (Twinword API မှ ရလာလျှင် ပြရန်) */}
        {data.synonyms && data.synonyms.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-800">
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Synonyms</p>
            <div className="flex flex-wrap gap-1.5">
              {data.synonyms.map((syn, i) => (
                <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[11px] rounded border border-slate-700">
                  {syn}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* External Links */}
      <div className="pt-3 mt-3 border-t border-slate-800 flex gap-2">
        <ExternalLink href={`https://www.oxfordlearnersdictionaries.com/definition/english/${cleanWord}`} label="Oxford" color="blue" />
        <ExternalLink href={`https://dictionary.cambridge.org/dictionary/english/${cleanWord}`} label="Cambridge" color="green" />
      </div>

      {/* Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1.5"></div>
    </div>
  );
}

function ExternalLink({ href, label, color }: ExternalLinkProps) {
    const colors: Colors = { 
        blue: "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30", 
        green: "bg-green-600/20 text-green-400 hover:bg-green-600/30" 
    };
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`text-[10px] px-2 py-1 rounded transition-colors ${colors[color]}`}>
        {label} ↗
      </a>
    );
}