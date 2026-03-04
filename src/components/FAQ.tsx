"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Shadowing ဆိုတာ ဘာလဲ?",
    answer: "Shadowing ဆိုတာ Native Speaker တစ်ယောက် ပြောတာကို နားထောင်ပြီး သူပြောတဲ့အတိုင်း နောက်ကနေ ထပ်တူနီးပါး လိုက်ပြောရတဲ့ လေ့ကျင့်ခန်းဖြစ်ပါတယ်။ အသံထွက်နဲ့ လေယူလေသိမ်း တိုးတက်ဖို့ အထိရောက်ဆုံး နည်းလမ်းပါ။"
  },
  {
    question: "ဒီ App ကို သုံးဖို့ အင်တာနက် အမြဲလိုသလား?",
    answer: "ဟုတ်ကဲ့၊ ဗီဒီယိုတွေနဲ့ AI အသံစစ်ဆေးတဲ့ စနစ်ကို အသုံးပြုဖို့အတွက် အင်တာနက် ချိတ်ဆက်ထားဖို့ လိုအပ်ပါတယ်။"
  },
  {
    question: "Beginner တွေအတွက် သင့်တော်ပါသလား?",
    answer: "သင့်တော်ပါတယ်။ ကျွန်ုပ်တို့ App မှာ Beginner ကနေ Advanced အထိ အဆင့်ဆင့် ခွဲခြားပေးထားတဲ့ သင်ခန်းစာတွေ ပါဝင်ပါတယ်။"
  },
  {
    question: "AI က အသံထွက်ကို ဘယ်လို စစ်ဆေးပေးတာလဲ?",
    answer: "ကျွန်ုပ်တို့ရဲ့ AI က သင့်အသံကို မူရင်းအသံနဲ့ နှိုင်းယှဉ်ပြီး အသံထွက် (Pronunciation)၊ ရစ်သမ် (Rhythm) နဲ့ အလေးအနက်ထား ပြောရမယ့် နေရာတွေကို တွက်ချက်ပြီး ရမှတ်ပေးတာ ဖြစ်ပါတယ်။"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-2 ">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-indigo-400 border-indigo-500/20">
              <HelpCircle size={32} />
            </div>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-6">အမေးများသော <span className="text-gradient">မေးခွန်းများ</span></h2>
          <p className="text-slate-400 text-lg">Shadowing App နဲ့ ပတ်သက်ပြီး သိလိုသမျှကို ဤနေရာတွင် ရှာဖွေနိုင်ပါတယ်။</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl border-white/5"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between p-8 text-left transition-all duration-300 ${openIndex === index ? 'bg-indigo-500/10' : 'hover:bg-white/5'
                  }`}
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-indigo-400' : 'text-slate-200'
                  }`}>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-indigo-400 shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-slate-500 shrink-0" size={24} />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-8 pt-0 text-slate-400 border-t border-white/5 leading-relaxed font-medium">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;