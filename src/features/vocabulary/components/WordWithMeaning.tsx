"use client";

import { DictionaryEntry, SavedWord } from "../types";
import React, { useState, useEffect, useRef } from "react";
import PopoverContent from "../context/PopoverContext";

const getCleanWord = (word: string) => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "").toLowerCase();

const getSavedWords = (): SavedWord[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("vocabulary") || "[]");
  } catch {
    return [];
  }
};

interface WordWithMeaningProps {
  word: string;
  contextSentence?: string;
  lessonId?: string;
}

export default function WordWithMeaning({ word, contextSentence, lessonId }: WordWithMeaningProps) {
  const [data, setData] = useState<DictionaryEntry | null>(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [isSaved, setIsSaved] = useState(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const cleanWord = getCleanWord(word);

  // Check if word is already saved in vocabulary
  useEffect(() => {
    if (show) {
      const exists = getSavedWords().some((item) => item.word.toLowerCase() === cleanWord.toLowerCase());
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
      if (Array.isArray(result) && result.length > 0) {
        setData(result[0]);
      }
    } catch (err) {
      console.error("Dictionary lookup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Vocabulary Save/Delete Logic with 1-Click Context & SRS metadata
  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const savedWords = getSavedWords();
    let updatedList: SavedWord[];

    if (isSaved) {
      updatedList = savedWords.filter((item) => item.word.toLowerCase() !== cleanWord.toLowerCase());
    } else {
      const newEntry: SavedWord = {
        word: cleanWord,
        definition: data?.meanings[0]?.definitions[0]?.definition || "Saved from dialogue",
        phonetic: data?.phonetic || data?.phonetics?.find((p) => p.text)?.text || "",
        addedAt: new Date().toISOString(),
        contextSentence: contextSentence || undefined,
        lessonId: lessonId || undefined,
        intervalDays: 1,
        nextReviewDate: new Date().toISOString(),
        reviewCount: 0,
        easeFactor: 2.5,
      };
      updatedList = [...savedWords, newEntry];
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
        className={`cursor-pointer transition-colors border-b border-dotted ${
          show
            ? "text-[#B5A642] border-[#B5A642] font-semibold"
            : "border-[#7A7A7A]/50 hover:text-[#B5A642] hover:border-[#B5A642]"
        }`}
        title="Click for dictionary definition & 1-click SRS save"
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
          contextSentence={contextSentence}
        />
      )}
    </span>
  );
}
