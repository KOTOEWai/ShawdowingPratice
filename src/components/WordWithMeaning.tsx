"use client";

import {  DictionaryEntry,  } from "@/app/Types/Type";
import React, { useState, useEffect, useRef } from "react";
import PopoverContent from "./PopoverContext";


const getCleanWord = (word: string) => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

const getSavedWords = (): DictionaryEntry[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("vocabulary") || "[]");
};

export default function WordWithMeaning({ word }: { word: string }) {
  const [data, setData] = useState<DictionaryEntry | null>(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [isSaved, setIsSaved] = useState(false);
  
  const containerRef = useRef<HTMLSpanElement>(null);
  const cleanWord = getCleanWord(word);

  // စကားလုံး သိမ်းထားပြီးသား ဟုတ်မဟုတ် စစ်ဆေးခြင်း
  useEffect(() => {
    if (show) {
      const exists = getSavedWords().some((item) => item.word === cleanWord);
      setIsSaved(exists);
    }
  }, [show, cleanWord]);

  // Dictionary Lookup Logic
  const handleLookup = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ top: rect.top, left: rect.left + rect.width / 2 });
    setShow(!show);
    
    if (data || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
      const result = await res.json();
      if (Array.isArray(result)) setData(result[0]);
    } catch (err) {
      console.error("Lookup failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Vocabulary Save/Delete Logic
  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const savedWords = getSavedWords();
    let updatedList;
    if (isSaved) {
      updatedList = savedWords.filter((item) => item.word !== cleanWord);
    } else {
      updatedList = [...savedWords, {
        word: cleanWord,
        definition: data?.meanings[0]?.definitions[0]?.definition,
        phonetic: data?.phonetic || data?.phonetics?.[0]?.text,
        addedAt: new Date().toISOString()
      }];
    }
    
    localStorage.setItem("vocabulary", JSON.stringify(updatedList));
    setIsSaved(!isSaved);
  };

  // Outside Click & Scroll Close Logic
  useEffect(() => {
    const close = () => setShow(false);
    document.addEventListener("mousedown", (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    });
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", close);
    };
  }, []);

  return (
    <span className="relative inline-block mx-0.5" ref={containerRef}>
      <span 
        onClick={handleLookup}
        className={`cursor-pointer hover:text-blue-400 transition-colors border-b border-dotted ${
          show ? "text-blue-400 border-blue-400" : "border-slate-600"
        }`}
      >
        {word}
      </span>

      {show && (
        <PopoverContent 
          data={data} 
          loading={loading} 
          coords={coords} 
          isSaved={isSaved} 
          onSave={toggleSave} 
          cleanWord={cleanWord}
        />
      )}
    </span>
  );
}




