export interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  rotation?: number;
}

export interface ReasonItem {
  icon: string;
  title: string;
  text: string;
}

export interface BirthdayConfig {
  name: string;
  fromName: string;
  heroCaption: string;
  heroImage: string;
  heroImageFallback: string;
  music: string;
  surpriseVideo: string;
  photos: PhotoItem[];
  reasons: ReasonItem[];
  wishes: string[];
  finalLines: string[];
  letter: string[];
}

export const CONFIG: BirthdayConfig = {
  name: "Someone",
  fromName: "Aku",
  heroCaption: "my favorite person ♡",
  heroImage: "/images/hero.jpg",
  heroImageFallback: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
  music: "/music/birthday.mp3",
  surpriseVideo: "/videos/video-dia.mp4",

  photos: [
    {
      id: "p1",
      src: "/images/memory-01.jpg",
      caption: "pretty girl 🎀",
      rotation: -3
    },
    {
      id: "p2",
      src: "/images/memory-02.jpg",
      caption: "that smile tho 💗",
      rotation: 2.5
    },
    {
      id: "p3",
      src: "/images/memory-03.jpg",
      caption: "cutie alert 🚨",
      rotation: -2
    },
    {
      id: "p4",
      src: "/images/memory-04.jpg",
      caption: "✨ unforgettable ✨",
      rotation: 3.5
    },
    {
      id: "p5",
      src: "/images/memory-05.jpg",
      caption: "just you being you 🌸",
      rotation: -1.5
    },
    {
      id: "p6",
      src: "/images/memory-06.jpg",
      caption: "proof you're 100% adorable 🎀",
      rotation: 2
    }
  ],

  reasons: [
    {
      icon: "🎀",
      title: "Your Smile",
      text: "Seriously... senyuman kamu itu bisa bikin hari yang capek langsung terasa lebih ringan dan cerah."
    },
    {
      icon: "🌸",
      title: "Your Personality",
      text: "Cara kamu ngomong, ketawa, dan peduli sama orang lain selalu bikin kamu berkesan."
    },
    {
      icon: "🦋",
      title: "Your Energy",
      text: "Momen biasa aja bisa berubah jadi seru dan menyenangkan kalau ada kamu."
    },
    {
      icon: "✨",
      title: "Your Laugh",
      text: "Ketawa kamu yang lepas itu nular banget dan salah satu hal favorit yang paling ngangenin."
    },
    {
      icon: "💗",
      title: "Just You",
      text: "Kamu itu spesial bukan karena harus sempurna, tapi karena kamu adalah kamu."
    }
  ],

  wishes: [
    "🌸 Lebih banyak kebahagiaan & hal-hal manis",
    "🎀 Kenangan-kenangan indah yang menyenangkan",
    "✨ Kejutan-kejutan baik yang gak terduga",
    "🦋 Alasan untuk selalu tersenyum setiap hari",
    "💗 Hati yang tenang dan dikelilingi orang-orang baik"
  ],

  finalLines: [
    "Thank you for being you.",
    "Stay cute.",
    "Stay happy.",
    "Keep smiling.",
    "And don't forget...",
    "You're someone deeply worth celebrating! 🌸✨"
  ],

  letter: [
    "Happy birthday yaaa! 🎂💗",
    "Semoga di umur yang baru ini kamu selalu dikelilingi hal-hal baik, orang-orang baik, dan tentunya punya segudang alasan untuk tersenyum.",
    "Semoga semua mimpi dan hal-hal yang lagi kamu perjuangkan pelan-pelan menemukan jalannya.",
    "Jangan terlalu banyak overthinking, kalau capek istirahat dulu yaa. Nggak harus selalu kuat terus.",
    "Dan jangan lupa kalau kamu itu sebenarnya... pretty cute, precious, and loved. 🎀",
    "Pokoknya hari ini kamu harus paling happy karena ini HARI SPESIAL KAMU! 🌸✨"
  ]
};
