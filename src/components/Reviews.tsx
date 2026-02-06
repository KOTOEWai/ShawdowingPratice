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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">
            Real Stories
          </h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900">
            ကျွန်ုပ်တို့၏ သင်ယူသူများ ပြောစကား
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="relative p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
            >
              {/* Quote Icon Background */}
              <Quote className="absolute top-6 right-8 text-slate-200 group-hover:text-blue-100 transition-colors" size={40} />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-700 leading-relaxed mb-8 italic">
                &quot;{item.content}&quot;
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <Image
                  src={item.image} 
                  width={200}
                  height={200}
                  alt={item.name} 
                  className="w-12 h-12 rounded-full bg-blue-100 border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{item.role}</p>
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