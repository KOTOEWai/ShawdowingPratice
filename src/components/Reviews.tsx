import React from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
const testimonials = [
  {
    name: "မောင်မောင်",
    role: "IELTS Student",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&s",
    content: "အရင်က အင်္ဂလိပ်စာ ဖတ်နိုင်ပေမယ့် စကားပြောရင် လေယူလေသိမ်းက လုံးဝမမှန်ဘူး။ ဒီ App နဲ့ နေ့တိုင်း Shadowing လုပ်တာ ၃ လအတွင်း သူငယ်ချင်းတွေကတောင် အသံထွက် ထူးထူးခြားခြား ကောင်းလာတယ်လို့ ပြောကြတယ်။",
    rating: 5
  },
  {
    name: "Sophia Rose",
    role: "Intermediate Learner",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&s",
    content: "Native speaker တွေရဲ့ အသံကို တိုက်ရိုက်နားထောင်ပြီး လိုက်ပြောရတာ အရမ်းထိရောက်ပါတယ်။ AI က ကိုယ့်အမှားကို ချက်ချင်းထောက်ပြပေးတာက အကြိုက်ဆုံး feature ပါပဲ။",
    rating: 5
  },
  {
    name: "ကိုအောင်",
    role: "Business Professional",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalURue8uREswsyHXvJ9qmw4TSZqCxIEQNjg&s",
    content: "အလုပ်ကိစ္စနဲ့ နိုင်ငံခြားသားတွေနဲ့ စကားပြောရတဲ့အခါ ပိုပြီး ယုံကြည်မှုရှိလာတယ်။ Shadowing က တကယ်ကို အလုပ်ဖြစ်တဲ့ နည်းလမ်းပါ။",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-24  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-20">
          <h2 className="text-indigo-400 font-black tracking-widest uppercase text-sm mb-4">
            Real Stories
          </h2>
          <h3 className="text-4xl lg:text-6xl font-black text-white">
            ကျွန်ုပ်တို့၏ သင်ယူသူများ <span className="text-gradient">ပြောစကား</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative p-10 rounded-[2.5rem] glass-card border-white/5 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] group overflow-hidden"
            >
              {/* Quote Icon Background */}
              <Quote className="absolute top-8 right-10 text-indigo-500/10 group-hover:text-indigo-500/20 transition-all duration-500 scale-150 rotate-12" size={60} />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-300 text-lg leading-relaxed mb-10 font-medium italic relative z-10">
                &quot;{item.content}&quot;
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  width={200}
                  height={200}
                  alt={item.name}
                  className="w-14 h-14 rounded-2xl bg-indigo-500/10 border-2 border-white/10 shadow-lg object-cover"
                />
                <div>
                  <h4 className="font-black text-white text-lg">{item.name}</h4>
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;