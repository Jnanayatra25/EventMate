import { EventItem } from '@/types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Adelle Concert',
    date: '18 Desember 2026',
    time: '19:30 WIB',
    location: 'Stadion Utama Gelora Bung Karno, Jakarta',
    category: 'Music',
    description: 'Konser megah akhir tahun Adelle membawakan lagu-lagu hits legendaris dengan tata panggung spektakuler dan tata suara berkelas dunia.',
    imageUri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Pencak Silat Championship',
    date: '20 Desember 2026',
    time: '09:00 WIB',
    location: 'Surya Yudha Sport Center, Banjarnegara',
    category: 'Arts & Culture',
    description: 'Kejuaraan seni bela diri tradisional Pencak Silat tingkat nasional menampilkan atraksi jurus tunggal dan ganda dari pendekar terbaik nusantara.',
    imageUri: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Harmoni Jazz Senja Festival',
    date: '25 Desember 2026',
    time: '16:00 WIB',
    location: 'Taman Budaya, Yogyakarta',
    category: 'Music',
    description: 'Festival musik jazz outdoor dengan suasana sore yang hangat menghadirkan deretan musisi jazz indie dan ternama.',
    imageUri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Kajian Akbar Nusantara',
    date: '28 Desember 2026',
    time: '08:00 WIB',
    location: 'Masjid Raya Istiqlal, Jakarta',
    category: 'Religious',
    description: 'Tabligh akbar dan kajian refleksi akhir tahun bertemakan merajut kebaikan untuk persatuan umat bersama para ulama terkemuka.',
    imageUri: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Exhibition Arts & Culture',
    date: '30 Desember 2026',
    time: '10:00 WIB',
    location: 'Galeri Nasional Indonesia, Jakarta',
    category: 'Arts & Culture',
    description: 'Pameran karya seni instalasi rupa, lukisan modern, dan kerajinan nusantara karya kurator muda berbakat.',
    imageUri: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1000&auto=format&fit=crop',
  },
];

export const CATEGORIES = ['All', 'Music', 'Arts & Culture', 'Religious'];
