"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface SavedWord {
  word: string;
  definition: string;
  phonetic: string;
  addedAt: string;
}

export default function VocabularyPage() {
  const [vocabList, setVocabList] = useState<SavedWord[]>([]);
   
  const clearAllVocabulary = () => {
  const confirmed = window.confirm("Are you sure you want to delete ALL saved words? This action cannot be undone.");
  
  if (confirmed) {
    localStorage.removeItem("vocabulary");
    setVocabList([]); // State ကိုပါ clear လုပ်ပေးရပါမယ်
  }
};

  // 1. LocalStorage ကနေ စကားလုံးများ ဆွဲထုတ်ခြင်း
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("vocabulary") || "[]");
    // အသစ်ဆုံး သိမ်းထားတာတွေကို အပေါ်မှာ ထားရန် reverse လုပ်သည်
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVocabList(saved.sort((a: SavedWord, b: SavedWord) => 
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    ));
  }, []);

  // 2. စကားလုံး ပြန်ဖျက်ရန်
  const removeWord = (word: string) => {
    const updated = vocabList.filter((item) => item.word !== word);
    localStorage.setItem("vocabulary", JSON.stringify(updated));
    setVocabList(updated);
  };

  // 3. အသံထွက် နားထောင်ရန်
  const playAudio = (word: string) => {
    const audio = new Audio(`https://api.dictionaryapi.dev/media/pronunciations/en/${word}-us.mp3`);
    audio.play().catch(() => alert("Audio not available"));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 bg-slate-900/40 p-5 rounded-3xl border border-slate-800">
  {/* Left Side: Title & Counter */}
  <div>
    <h1 className="text-xl lg:text-3xl font-bold text-white tracking-tight">My Vocabulary</h1>
    <p className="text-sm text-slate-500 lg:text-slate-400 mt-1">
      Total: <span className="text-blue-400 font-mono">{vocabList.length}</span> words saved
    </p>
  </div>

  {/* Right Side: Action Buttons */}
  <div className="flex flex-wrap items-center gap-3">
    {vocabList.length > 0 && (
      <button
        onClick={clearAllVocabulary}
        className="flex-1 md:flex-none px-4 py-2.5 text-xs font-semibold text-red-400 border border-red-400/30 hover:bg-red-400/10 rounded-xl transition-all active:scale-95"
      >
        Clear All
      </button>
    )}
    
    <Link 
      href="/Topics" 
      className="flex-1 md:flex-none px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs lg:text-sm transition-colors text-center whitespace-nowrap"
    >
      Back to Practice
    </Link>
    
    <Link 
      href="/Vocabulary/Flashcards" 
      className="flex-1 md:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs lg:text-sm font-medium transition-all text-center whitespace-nowrap shadow-lg shadow-blue-500/20 active:scale-95"
    >
      Practice Flashcards
    </Link>
  </div>
</div>

        {/* Word List */}
        {vocabList.length === 0 ? (
       

        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800">
         <div className="text-4xl mb-4">No words saved yet. Start practicing!</div>
         <h3 className="text-xl font-bold text-white mb-2">Your list is empty</h3>
         <p className="text-slate-500 max-w-xs mb-6">
         Go back to your practice videos and click on words you don&apos;t know to save them here.
           </p>
        <Link href="/Topics" className="text-blue-400 hover:text-blue-300 font-medium underline">
        Browse Practice Topics
        </Link>
        </div>
        ) : (
          <div className="grid gap-4">
            {vocabList.map((item) => (
              <div 
                key={item.word} 
                className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-blue-400 capitalize">{item.word}</h2>
                    <span className="text-xs font-mono text-slate-500">{item.phonetic}</span>
                    <button 
                      onClick={() => playAudio(item.word)}
                      className="text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      🔊
                    </button>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    {item.definition || "No definition available."}
                  </p>
                  <p className="text-[10px] text-slate-600 mt-2">
                    Added on {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                   <a 
                    href={`https://www.google.com/search?q=define+${item.word}`}
                    target="_blank"
                    className="p-2 text-xs bg-slate-800 hover:bg-slate-700 rounded-lg"
                   >
                    Details
                   </a>
                   <button 
                    onClick={() => removeWord(item.word)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                   >
                    Delete
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}