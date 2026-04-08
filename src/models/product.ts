export type ProductOrigin = 'BASE_BODY' | 'GENERAL';
export type ProductStatus = 'ON_SHELF' | 'OFF_SHELF';

export interface Product {
  id: string;
  name: string;
  origin: ProductOrigin;
  category: string;
  price: number;
  artist: string | null;      // '-' if BASE_BODY
  manufacturer: string;
  leadTime: string;
  status: ProductStatus;
}

export const initialProducts: Product[] = [
  {
    id: 'P001',
    name: '經典潮流短T素體',
    origin: 'BASE_BODY',
    category: '服飾',
    price: 350,
    artist: null,
    manufacturer: '星辰服裝廠',
    leadTime: '3-5 天',
    status: 'ON_SHELF',
  },
  {
    id: 'P002',
    name: '賽博龐克風格保溫瓶',
    origin: 'GENERAL',
    category: '生活小物',
    price: 880,
    artist: 'NeonDreamer',
    manufacturer: '優質不鏽鋼製品實業',
    leadTime: '7-10 天',
    status: 'ON_SHELF',
  },
  {
    id: 'P003',
    name: '復古帆布托特包素體',
    origin: 'BASE_BODY',
    category: '配件',
    price: 290,
    artist: null,
    manufacturer: '良品布業',
    leadTime: '3-5 天',
    status: 'OFF_SHELF',
  },
  {
    id: 'P004',
    name: '星空漸層手機殼',
    origin: 'GENERAL',
    category: '3C周邊',
    price: 580,
    artist: 'Alice Art',
    manufacturer: '奇機配件廠',
    leadTime: '2-4 天',
    status: 'ON_SHELF',
  },
  {
    id: 'P005',
    name: '街頭塗鴉棒球帽',
    origin: 'GENERAL',
    category: '配飾',
    price: 650,
    artist: 'StreetKing_99',
    manufacturer: '頂尖帽業',
    leadTime: '5-7 天',
    status: 'ON_SHELF',
  },
  {
    id: 'P006',
    name: '極簡白瓷馬克杯素體',
    origin: 'BASE_BODY',
    category: '生活小物',
    price: 150,
    artist: null,
    manufacturer: '尚瓷陶業',
    leadTime: '2-3 天',
    status: 'ON_SHELF',
  }
];
