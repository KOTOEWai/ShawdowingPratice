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
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-2 ">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <HelpCircle size={24} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">အမေးများသော မေးခွန်းများ</h2>
          <p className="text-slate-600">Shadowing App နဲ့ ပတ်သက်ပြီး သိလိုသမျှကို ဤနေရာတွင် ရှာဖွေနိုင်ပါတယ်။</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-blue-600 shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-slate-400 shrink-0" size={20} />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 border-t border-slate-50 leading-relaxed">
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