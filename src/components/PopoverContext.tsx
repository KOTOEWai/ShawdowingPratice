import { Colors, DictionaryEntry, ExternalLinkProps, PopOverProps } from "@/app/Types/Type";



export default function PopoverContent({ data, loading, coords, isSaved, onSave, cleanWord }: PopOverProps) {
  if (loading) return (
    <div className="fixed z-9999 w-72 bg-slate-900 p-4 rounded-2xl border border-slate-700 shadow-2xl" 
         style={{ bottom: `calc(100vh - ${coords.top}px + 12px)`, left: `${coords.left}px`, transform: 'translateX(-50%)' }}>
      <p className="text-xs text-slate-400 italic font-mono animate-pulse">Searching dictionary...</p>
    </div>
  );

  if (!data) return null;

  const audioObj = data.phonetics?.find((p:DictionaryEntry['phonetics'][0]) => p.audio);

  return (
    <div 
      className="fixed z-9999 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200"
      style={{ bottom: `calc(100vh - ${coords.top}px + 12px)`, left: `${coords.left}px`, transform: 'translateX(-50%)' }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-white leading-none">{data.word}</h3>
          <p className="text-blue-400 text-xs mt-1 font-mono">{data.phonetic || data.phonetics?.[0]?.text}</p>
        </div>
        <div className="flex gap-2">
          {audioObj && (
            <button onClick={() => new Audio(audioObj.audio).play()} className="p-1.5 bg-blue-500/10 rounded-full text-blue-400">🔊</button>
          )}
          <button onClick={onSave} className={`p-1.5 rounded-full ${isSaved ? "text-yellow-500 bg-yellow-500/10" : "text-slate-400 bg-slate-800"}`}>
            {isSaved ? "⭐" : "📝"}
          </button>
        </div>
      </div>
      
      <hr className="border-slate-800 mb-3" />
      
      <div className="max-h-32 overflow-y-auto">
        <p className="text-slate-500 text-[10px] uppercase font-bold">{data.meanings[0].partOfSpeech}</p>
        <p className="text-sm text-slate-200 mt-1">{data.meanings[0].definitions[0].definition}</p>
      </div>

      <div className="pt-3 mt-3 border-t border-slate-800 flex gap-2">
        <ExternalLink href={`https://www.oxfordlearnersdictionaries.com/definition/english/${cleanWord}`} label="Oxford" color="blue" />
        <ExternalLink href={`https://dictionary.cambridge.org/dictionary/english/${cleanWord}`} label="Cambridge" color="green" />
      </div>

      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1.5"></div>
    </div>
  );
}

function ExternalLink({ href, label, color }: ExternalLinkProps) {
    const colors: Colors = { blue: "bg-blue-600/20 text-blue-400", green: "bg-green-600/20 text-green-400" };
    return <a href={href} target="_blank" className={`text-[10px] px-2 py-1 rounded ${colors[color]}`}>{label}</a>;
}