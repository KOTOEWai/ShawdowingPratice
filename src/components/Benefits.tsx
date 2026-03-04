import React from 'react';
import { Zap, Volume2, Target, Smartphone } from 'lucide-react';



export default function Benefits() {


  const benefits = [
    {
      title: "Natural Accent",
      description: "မူရင်းအသံရှင်တွေရဲ့ လေယူလေသိမ်းအတိုင်း လိုက်ပြောရင်း သဘာဝကျတဲ့ အသံထွက်ကို ရရှိစေမှာပါ။",
      icon: <Volume2 className="text-blue-400" size={28} />,
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Instant Feedback",
      description: "ကိုယ့်ရဲ့ အသံထွက် ဘယ်လောက်အထိ မှန်ကန်လဲဆိုတာကို AI စနစ်နဲ့ ချက်ချင်း တိုင်းတာပေးပါတယ်။",
      icon: <Target className="text-purple-400" size={28} />,
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Fast Progress",
      description: "တစ်နေ့ကို ၁၅ မိနစ်ပဲ လေ့ကျင့်ရုံနဲ့ သင့်ရဲ့ စကားပြောစွမ်းရည် သိသိသာသာ တိုးတက်လာမှာပါ။",
      icon: <Zap className="text-amber-400" size={28} />,
      bgColor: "bg-amber-500/10"
    },
    {
      title: "Learn Anywhere",
      description: "ဖုန်း ဒါမှမဟုတ် ကွန်ပျူတာ ကြိုက်ရာကနေ အချိန်မရွေး၊ နေရာမရွေး လေ့ကျင့်နိုင်ပါတယ်။",
      icon: <Smartphone className="text-green-400" size={28} />,
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-2 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header အပိုင်း */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
            ဘာကြောင့် <span className="text-gradient">Shadowing</span> လေ့ကျင့်သင့်တာလဲ?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            စကားပြောစွမ်းရည် တိုးတက်ဖို့အတွက် အထိရောက်ဆုံး နည်းလမ်းတစ်ခုဖြစ်တဲ့ Shadowing ကို အခုပဲ စတင်လိုက်ပါ။
          </p>
        </div>

        {/* Benefits Grid အပိုင်း */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="glass-card p-10 rounded-3xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`${benefit.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                {benefit.title}
              </h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );


}
