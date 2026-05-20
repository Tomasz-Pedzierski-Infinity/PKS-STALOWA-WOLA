export const cities = [
  'Stalowa Wola', 'Tarnobrzeg', 'Rzeszów', 'Lublin', 'Sandomierz',
  'Janów Lubelski', 'Nisko', 'Mielec', 'Kraśnik', 'Warszawa',
  'Kraków', 'Zamość', 'Biłgoraj', 'Leżajsk', 'Łańcut',
];

export const popularRoutes = [
  { from: 'Stalowa Wola', to: 'Rzeszów', price: 18, duration: '1h 25min' },
  { from: 'Stalowa Wola', to: 'Lublin', price: 22, duration: '1h 50min' },
  { from: 'Stalowa Wola', to: 'Warszawa', price: 49, duration: '4h 10min' },
  { from: 'Stalowa Wola', to: 'Kraków', price: 39, duration: '3h 30min' },
  { from: 'Stalowa Wola', to: 'Tarnobrzeg', price: 8, duration: '25min' },
];

export type Connection = {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  transfers: number;
  price: number;
  carrier: string;
  amenities: string[];
  seatsLeft: number;
};

const carrier = 'PKS Stalowa Wola';

export const mockConnections: Connection[] = [
  // Stalowa Wola → Rzeszów (1h 25min)
  { id: 'rz-1', from: 'Stalowa Wola', to: 'Rzeszów', departure: '06:15', arrival: '07:40', duration: '1h 25min', transfers: 0, price: 18, carrier, amenities: ['WiFi', 'USB', 'AC'], seatsLeft: 23 },
  { id: 'rz-2', from: 'Stalowa Wola', to: 'Rzeszów', departure: '07:30', arrival: '09:05', duration: '1h 35min', transfers: 0, price: 18, carrier, amenities: ['WiFi', 'USB', 'AC'], seatsLeft: 14 },
  { id: 'rz-3', from: 'Stalowa Wola', to: 'Rzeszów', departure: '09:00', arrival: '10:25', duration: '1h 25min', transfers: 0, price: 22, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 41 },
  { id: 'rz-4', from: 'Stalowa Wola', to: 'Rzeszów', departure: '11:45', arrival: '13:30', duration: '1h 45min', transfers: 1, price: 16, carrier, amenities: ['WiFi', 'AC'], seatsLeft: 8 },
  { id: 'rz-5', from: 'Stalowa Wola', to: 'Rzeszów', departure: '14:20', arrival: '15:50', duration: '1h 30min', transfers: 0, price: 18, carrier, amenities: ['WiFi', 'USB', 'AC'], seatsLeft: 32 },
  { id: 'rz-6', from: 'Stalowa Wola', to: 'Rzeszów', departure: '16:00', arrival: '17:25', duration: '1h 25min', transfers: 0, price: 24, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 19 },
  { id: 'rz-7', from: 'Stalowa Wola', to: 'Rzeszów', departure: '18:15', arrival: '19:55', duration: '1h 40min', transfers: 0, price: 18, carrier, amenities: ['WiFi', 'USB', 'AC'], seatsLeft: 27 },
  { id: 'rz-8', from: 'Stalowa Wola', to: 'Rzeszów', departure: '20:30', arrival: '21:55', duration: '1h 25min', transfers: 0, price: 16, carrier, amenities: ['AC'], seatsLeft: 5 },

  // Stalowa Wola → Lublin (1h 50min)
  { id: 'lu-1', from: 'Stalowa Wola', to: 'Lublin', departure: '05:50', arrival: '07:40', duration: '1h 50min', transfers: 0, price: 22, carrier, amenities: ['WiFi', 'USB', 'AC'], seatsLeft: 28 },
  { id: 'lu-2', from: 'Stalowa Wola', to: 'Lublin', departure: '08:15', arrival: '10:05', duration: '1h 50min', transfers: 0, price: 22, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 35 },
  { id: 'lu-3', from: 'Stalowa Wola', to: 'Lublin', departure: '11:00', arrival: '12:50', duration: '1h 50min', transfers: 0, price: 28, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 16 },
  { id: 'lu-4', from: 'Stalowa Wola', to: 'Lublin', departure: '14:30', arrival: '16:20', duration: '1h 50min', transfers: 0, price: 22, carrier, amenities: ['WiFi', 'USB', 'AC'], seatsLeft: 22 },
  { id: 'lu-5', from: 'Stalowa Wola', to: 'Lublin', departure: '17:00', arrival: '18:50', duration: '1h 50min', transfers: 0, price: 28, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 11 },
  { id: 'lu-6', from: 'Stalowa Wola', to: 'Lublin', departure: '19:45', arrival: '21:35', duration: '1h 50min', transfers: 0, price: 22, carrier, amenities: ['WiFi', 'AC'], seatsLeft: 18 },

  // Stalowa Wola → Warszawa (4h 10min)
  { id: 'wa-1', from: 'Stalowa Wola', to: 'Warszawa', departure: '06:00', arrival: '10:10', duration: '4h 10min', transfers: 0, price: 49, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 31 },
  { id: 'wa-2', from: 'Stalowa Wola', to: 'Warszawa', departure: '09:30', arrival: '13:40', duration: '4h 10min', transfers: 0, price: 59, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 24 },
  { id: 'wa-3', from: 'Stalowa Wola', to: 'Warszawa', departure: '13:15', arrival: '17:25', duration: '4h 10min', transfers: 0, price: 49, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 17 },
  { id: 'wa-4', from: 'Stalowa Wola', to: 'Warszawa', departure: '17:00', arrival: '21:10', duration: '4h 10min', transfers: 0, price: 59, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 9 },

  // Stalowa Wola → Kraków (3h 30min)
  { id: 'kr-1', from: 'Stalowa Wola', to: 'Kraków', departure: '07:00', arrival: '10:30', duration: '3h 30min', transfers: 0, price: 39, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 26 },
  { id: 'kr-2', from: 'Stalowa Wola', to: 'Kraków', departure: '10:15', arrival: '13:45', duration: '3h 30min', transfers: 0, price: 45, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 19 },
  { id: 'kr-3', from: 'Stalowa Wola', to: 'Kraków', departure: '14:45', arrival: '18:15', duration: '3h 30min', transfers: 0, price: 39, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 33 },
  { id: 'kr-4', from: 'Stalowa Wola', to: 'Kraków', departure: '18:30', arrival: '22:00', duration: '3h 30min', transfers: 0, price: 45, carrier, amenities: ['WiFi', 'USB', 'AC', 'WC'], seatsLeft: 12 },

  // Stalowa Wola → Tarnobrzeg (25min, lokalna podmiejska)
  { id: 'tb-1', from: 'Stalowa Wola', to: 'Tarnobrzeg', departure: '06:30', arrival: '06:55', duration: '25min', transfers: 0, price: 8, carrier, amenities: ['AC'], seatsLeft: 38 },
  { id: 'tb-2', from: 'Stalowa Wola', to: 'Tarnobrzeg', departure: '07:45', arrival: '08:10', duration: '25min', transfers: 0, price: 8, carrier, amenities: ['AC'], seatsLeft: 22 },
  { id: 'tb-3', from: 'Stalowa Wola', to: 'Tarnobrzeg', departure: '09:30', arrival: '09:55', duration: '25min', transfers: 0, price: 10, carrier, amenities: ['AC', 'USB'], seatsLeft: 41 },
  { id: 'tb-4', from: 'Stalowa Wola', to: 'Tarnobrzeg', departure: '11:15', arrival: '11:40', duration: '25min', transfers: 0, price: 8, carrier, amenities: ['AC'], seatsLeft: 29 },
  { id: 'tb-5', from: 'Stalowa Wola', to: 'Tarnobrzeg', departure: '13:00', arrival: '13:25', duration: '25min', transfers: 0, price: 8, carrier, amenities: ['AC'], seatsLeft: 34 },
  { id: 'tb-6', from: 'Stalowa Wola', to: 'Tarnobrzeg', departure: '15:30', arrival: '15:55', duration: '25min', transfers: 0, price: 10, carrier, amenities: ['AC', 'USB'], seatsLeft: 25 },
  { id: 'tb-7', from: 'Stalowa Wola', to: 'Tarnobrzeg', departure: '17:15', arrival: '17:40', duration: '25min', transfers: 0, price: 8, carrier, amenities: ['AC'], seatsLeft: 17 },
  { id: 'tb-8', from: 'Stalowa Wola', to: 'Tarnobrzeg', departure: '19:00', arrival: '19:25', duration: '25min', transfers: 0, price: 8, carrier, amenities: ['AC'], seatsLeft: 31 },
];

export type FuelStation = {
  id: string;
  name: string;
  address: string;
  city: string;
  open247: boolean;
  prices: { type: string; price: number; trend: 'up' | 'down' | 'stable' }[];
};

export const fuelStations: FuelStation[] = [
  {
    id: 'sw',
    name: 'Stacja Paliw Stalowa Wola',
    address: 'ul. Ofiar Katynia 30',
    city: 'Stalowa Wola',
    open247: true,
    prices: [
      { type: 'Pb 95', price: 6.29, trend: 'down' },
      { type: 'Pb 98', price: 6.79, trend: 'stable' },
      { type: 'ON', price: 6.45, trend: 'down' },
      { type: 'ON Premium', price: 6.89, trend: 'up' },
      { type: 'LPG', price: 3.19, trend: 'stable' },
    ],
  },
  {
    id: 'jl',
    name: 'Stacja Paliw Janów Lubelski',
    address: 'ul. Wojska Polskiego 12',
    city: 'Janów Lubelski',
    open247: false,
    prices: [
      { type: 'Pb 95', price: 6.31, trend: 'down' },
      { type: 'Pb 98', price: 6.81, trend: 'stable' },
      { type: 'ON', price: 6.47, trend: 'down' },
      { type: 'ON Premium', price: 6.91, trend: 'up' },
      { type: 'LPG', price: 3.21, trend: 'stable' },
    ],
  },
];

export const newsItems = {
  pl: [
    { id: 1, date: '2026-04-08', category: 'Połączenia', title: 'Nowe połączenie Stalowa Wola – Warszawa Zachodnia', excerpt: 'Od 15 kwietnia uruchamiamy bezpośrednie codzienne połączenie do stolicy. Czas przejazdu skrócony o 25 minut.' },
    { id: 2, date: '2026-04-02', category: 'Flota', title: 'Pięć nowych autokarów Setra w naszej flocie', excerpt: 'Inwestujemy w komfort pasażerów. Nowe pojazdy z WiFi 5G, gniazdami USB-C i klimatyzacją indywidualną.' },
    { id: 3, date: '2026-03-28', category: 'Promocja', title: '−20% na bilety weekendowe w kwietniu', excerpt: 'Kup bilet w piątek lub sobotę przez aplikację i zyskaj 20% rabatu na połączenia regionalne.' },
  ],
  en: [
    { id: 1, date: '2026-04-08', category: 'Routes', title: 'New connection Stalowa Wola – Warsaw West', excerpt: 'Starting April 15, we launch a direct daily connection to the capital. Travel time reduced by 25 minutes.' },
    { id: 2, date: '2026-04-02', category: 'Fleet', title: 'Five new Setra coaches join our fleet', excerpt: 'We invest in passenger comfort. New vehicles with 5G WiFi, USB-C ports and individual air conditioning.' },
    { id: 3, date: '2026-03-28', category: 'Promo', title: '−20% on weekend tickets in April', excerpt: 'Buy a ticket on Friday or Saturday via the app and get 20% off regional connections.' },
  ],
};
