import React from 'react';
import { Zap, Volume2, Target, Smartphone } from 'lucide-react';



export default function Benefits() {

  
      const benefits = [
    {
      title: "Natural Accent",
      description: "မူရင်းအသံရှင်တွေရဲ့ လေယူလေသိမ်းအတိုင်း လိုက်ပြောရင်း သဘာဝကျတဲ့ အသံထွက်ကို ရရှိစေမှာပါ။",
      icon: <Volume2 className="text-blue-600" size={28} />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Instant Feedback",
      description: "ကိုယ့်ရဲ့ အသံထွက် ဘယ်လောက်အထိ မှန်ကန်လဲဆိုတာကို AI စနစ်နဲ့ ချက်ချင်း တိုင်းတာပေးပါတယ်။",
      icon: <Target className="text-purple-600" size={28} />,
      bgColor: "bg-purple-50"
    },
    {
      title: "Fast Progress",
      description: "တစ်နေ့ကို ၁၅ မိနစ်ပဲ လေ့ကျင့်ရုံနဲ့ သင့်ရဲ့ စကားပြောစွမ်းရည် သိသိသာသာ တိုးတက်လာမှာပါ။",
      icon: <Zap className="text-amber-600" size={28} />,
      bgColor: "bg-amber-50"
    },
    {
      title: "Learn Anywhere",
      description: "ဖုန်း ဒါမှမဟုတ် ကွန်ပျူတာ ကြိုက်ရာကနေ အချိန်မရွေး၊ နေရာမရွေး လေ့ကျင့်နိုင်ပါတယ်။",
      icon: <Smartphone className="text-green-600" size={28} />,
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-2 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header အပိုင်း */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            ဘာကြောင့် Shadowing လေ့ကျင့်သင့်တာလဲ?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            စကားပြောစွမ်းရည် တိုးတက်ဖို့အတွက် အထိရောက်ဆုံး နည်းလမ်းတစ်ခုဖြစ်တဲ့ Shadowing ကို အခုပဲ စတင်လိုက်ပါ။
          </p>
        </div>

        {/* Benefits Grid အပိုင်း */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
            >
              <div className={`${benefit.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
   
  
}
