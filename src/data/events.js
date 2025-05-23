import openAirImg from '../assets/img/open_air_konzert.png';
import haldenzauberImg from '../assets/img/haldenzauber.png';
import kunstmarktImg from '../assets/img/kunstmarkt.png';
import festaImg from '../assets/img/festa_portuguesa.png';
import strassenfestImg from '../assets/img/strassenfest.png';
import flohmarktImg from '../assets/img/flohmarkt.png';
import sneakPreviewImg from '../assets/img/sneak_preview.png';
import halloweenPartyImg from '../assets/img/halloween_party.png';
import { useAuth } from '../context/AuthContext';

const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+CiAgICA8dGV4dCB4PSI0MDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+QmlsZCB3aXJkIGdlbGFkZW4uLi48L3RleHQ+Cjwvc3ZnPg==';

export const events = [
  {
    id: 1,
    title: "Heinsberg Open Air",
    date: "2025-07-15",
    time: "19:00",
    location: "Marktplatz Heinsberg",
    description: "Ein unvergesslicher Abend mit Live-Musik und guter Stimmung auf dem Marktplatz von Heinsberg. Genießen Sie regionale Bands und internationale Acts auf mehreren Bühnen.",
    img: openAirImg,
    rating: 4.5,
    category: "Musik",
    lat: 51.06366273806115,
    lng: 6.0965408944434,
    price: "25€",
    organizer: "Stadt Heinsberg",
    contact: "info@heinsberg.de",
    website: "www.heinsberg-open-air.de"
  },
  {
    id: 2,
    title: "Haldenzauber",
    date: "2025-08-20",
    time: "16:00",
    location: "Millicher Halde, Hückelhoven",
    description: "Genießen Sie ausgewählte Weine und regionale Spezialitäten in gemütlicher Atmosphäre auf der Millicher Halde in Hückelhoven. Live-Musik und kulinarische Highlights erwarten Sie mit einem einzigartigen Panoramablick über die Region.",
    img: haldenzauberImg,
    rating: 4.8,
    category: "Kulinarisch",
    lat: 51.0553554074782,
    lng: 6.212694461665088,
    price: "15€",
    organizer: "Heinsberg Marketing",
    contact: "info@haldenzauber.de",
    website: "www.haldenzauber.de"
  },
  {
    id: 3,
    title: "Kunstmarkt",
    date: "2025-09-10",
    time: "11:00",
    location: "Burg Wassenberg",
    description: "Entdecken Sie die Werke lokaler Künstler in einer einzigartigen Ausstellung auf der historischen Burg Wassenberg. Malerei, Skulpturen und Fotografie in einem beeindruckenden historischen Ambiente.",
    img: kunstmarktImg,
    rating: 4.2,
    category: "Kunst",
    lat: 51.100651080399395,
    lng: 6.156940558228974,
    price: "Eintritt frei",
    organizer: "Kulturverein Wassenberg",
    contact: "info@kunstmarkt-wassenberg.de",
    website: "www.kunstmarkt-wassenberg.de"
  },
  {
    id: 4,
    title: "Festa Portuguesa",
    date: "2025-07-30",
    time: "10:00",
    location: "Marktplatz & Hochstraße Heinsberg",
    description: "Ein Tag voller portugiesischer Kultur auf dem Marktplatz und der Hochstraße in Heinsberg. Genießen Sie traditionelle Tänze, kulinarische Spezialitäten und ein buntes Kulturprogramm.",
    img: festaImg,
    rating: 4.0,
    category: "Sport",
    lat: 51.06288794113616,
    lng: 6.095212207727861,
    price: "10€",
    organizer: "Portugiesischer Verein",
    contact: "info@festa-portuguesa.de",
    website: "www.festa-portuguesa.de"
  },
  {
    id: 5,
    title: "Straßenfest Oberbruch",
    date: "2025-08-05",
    time: "14:00",
    location: "Oberbruch",
    description: "Ein tolles Straßenfest im Herzen von Oberbruch mit Live-Musik, kulinarischen Köstlichkeiten und Attraktionen für die ganze Familie.",
    img: strassenfestImg,
    rating: 4.3,
    category: "Party",
    lat: 51.059069927648444,
    lng: 6.143579747481364,
    price: "Eintritt frei",
    organizer: "Oberbruch Initiative",
    contact: "info@strassenfest-oberbruch.de",
    website: "www.strassenfest-oberbruch.de"
  },
  {
    id: 6,
    title: "Großer Flohmarkt Heinsberg",
    date: "2025-09-22",
    time: "08:00",
    location: "Kaufland Parkplatz Heinsberg",
    description: "Der größte Flohmarkt der Region auf dem Parkplatz von Kaufland Heinsberg! Stöbern Sie durch tausende von Ständen mit Antiquitäten, Sammlerstücken, Kleidung und vielem mehr. Für das leibliche Wohl ist bestens gesorgt.",
    img: flohmarktImg,
    rating: 4.6,
    category: "Kultur",
    lat: 51.06946478007189,
    lng: 6.109875490388698,
    price: "Eintritt frei",
    organizer: "Heinsberg Marketing",
    contact: "info@heinsberg-marketing.de",
    website: "www.heinsberg-flohmarkt.de"
  },
  {
    id: 7,
    title: "Sneak Preview im Roxy",
    date: "2025-10-15",
    time: "20:00",
    location: "Roxy Kino Heinsberg",
    description: "Erleben Sie einen exklusiven Filmabend mit einem noch unveröffentlichten Kinofilm! Genießen Sie die Spannung und Überraschung in unserem historischen Kino. Popcorn und Getränke inklusive.",
    img: sneakPreviewImg,
    rating: 4.7,
    category: "Kultur",
    lat: 51.06205707259043,
    lng: 6.094886479950973,
    price: "12€",
    organizer: "Roxy Kino Heinsberg",
    contact: "info@roxy-heinsberg.de",
    website: "www.roxy-heinsberg.de"
  },
  {
    id: 8,
    title: "Halloween Party im Himmerich",
    date: "2025-10-31",
    time: "21:00",
    location: "Diskothek Himmerich",
    description: "Die gruseligste Party des Jahres in der Diskothek Himmerich! Erleben Sie eine Nacht voller Spannung, Musik und unvergesslicher Momente. Kostümierung erwünscht! DJs, Live-Acts und spezielle Halloween-Cocktails.",
    img: halloweenPartyImg,
    rating: 4.9,
    category: "Party",
    lat: 51.027110852141334,
    lng: 6.194430372494971,
    price: "15€",
    organizer: "Himmerich Events",
    contact: "info@himmerich.de",
    website: "www.himmerich-events.de"
  }
];
