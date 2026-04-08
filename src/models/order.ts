export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  name: string;
  specification: string;
  artist: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  key: string;
  id: string; // TBA250310001
  date: string; // YYYY-MM-DD
  buyerEmail: string;
  totalAmount: number;
  status: OrderStatus;
  shippingInfo: {
    recipient: string;
    phone: string;
    address: string;
  };
  paymentInfo: {
    invoiceMethod: string;
    paymentMethod: string;
  };
  trackingNumber?: string;
  items: OrderItem[];
}

export const initialOrders: Order[] = [
  {
    key: '1',
    id: 'TBA250310001',
    date: '2025-03-10',
    buyerEmail: 'consumer@example.com',
    totalAmount: 350,
    status: 'PENDING',
    shippingInfo: {
      recipient: '王小明',
      phone: '0912-345-678',
      address: '台北市大安區忠孝東路三段123號 5樓',
    },
    paymentInfo: {
      invoiceMethod: 'Email 電子發票',
      paymentMethod: '信用卡 (TapPay)',
    },
    items: [
      {
        id: 'item-1',
        name: '經典潮流短T素體',
        specification: 'M號 / 白色',
        artist: '-',
        price: 350,
        quantity: 1,
        image: 'https://placehold.co/50x50?text=T-Shirt',
      }
    ],
  },
  {
    key: '2',
    id: 'TBA250311002',
    date: '2025-03-11',
    buyerEmail: 'neon.lover@test.site',
    totalAmount: 1760,
    status: 'PROCESSING',
    shippingInfo: {
      recipient: '李阿亮',
      phone: '0928-111-222',
      address: '台中市西屯區台灣大道二段999號',
    },
    paymentInfo: {
      invoiceMethod: 'Email 電子發票',
      paymentMethod: '信用卡 (TapPay)',
    },
    items: [
      {
        id: 'item-2',
        name: '賽博龐克風格保溫瓶',
        specification: '原色 / 500ml',
        artist: 'NeonDreamer',
        price: 880,
        quantity: 2,
        image: 'https://placehold.co/50x50?text=Bottle',
      }
    ],
  },
  {
    key: '3',
    id: 'TBA250312003',
    date: '2025-03-12',
    buyerEmail: 'alice.chen@corp.com',
    totalAmount: 650,
    status: 'SHIPPED',
    shippingInfo: {
      recipient: '陳愛麗',
      phone: '0975-666-888',
      address: '高雄市左營區博愛二路777號',
    },
    paymentInfo: {
      invoiceMethod: '載具 (手機條碼)',
      paymentMethod: '信用卡 (TapPay)',
    },
    trackingNumber: 'SF1234567890',
    items: [
      {
        id: 'item-3',
        name: '街頭塗鴉棒球帽',
        specification: '可調節 / 黑色',
        artist: 'StreetKing_99',
        price: 650,
        quantity: 1,
        image: 'https://placehold.co/50x50?text=Cap',
      }
    ],
  },
  {
    key: '4',
    id: 'TBA250313004',
    date: '2025-03-13',
    buyerEmail: 'old.user@yahoo.tw',
    totalAmount: 1160,
    status: 'CANCELLED',
    shippingInfo: {
      recipient: '張大千',
      phone: '0933-444-555',
      address: '新北市板橋區縣民大道二段1號',
    },
    paymentInfo: {
      invoiceMethod: 'Email 電子發票',
      paymentMethod: '信用卡 (TapPay)',
    },
    items: [
      {
        id: 'item-4',
        name: '星空漸層手機殼',
        specification: 'iPhone 15 Pro / 特規',
        artist: 'Alice Art',
        price: 580,
        quantity: 2,
        image: 'https://placehold.co/50x50?text=PhoneCase',
      }
    ],
  },
  {
    key: '5',
    id: 'TBA250314005',
    date: '2025-03-14',
    buyerEmail: 'bulk.buyer@mega.com',
    totalAmount: 4350,
    status: 'PENDING',
    shippingInfo: {
      recipient: '大採購家',
      phone: '0900-000-000',
      address: '台北市信義區信義路五段7號 (台北101本部)',
    },
    paymentInfo: {
      invoiceMethod: '三聯式電子發票 (統一編號: 12345678)',
      paymentMethod: '信用卡 (TapPay)',
    },
    items: [
      {
        id: 'item-5-1',
        name: '經典潮流短T素體',
        specification: 'XL號 / 黑色',
        artist: '-',
        price: 350,
        quantity: 3,
        image: 'https://placehold.co/50x50?text=T-Shirt',
      },
      {
        id: 'item-5-2',
        name: '賽博龐克風格保溫瓶',
        specification: '灰黑色 / 750ml',
        artist: 'NeonDreamer',
        price: 980,
        quantity: 1,
        image: 'https://placehold.co/50x50?text=Bottle',
      },
      {
        id: 'item-5-3',
        name: '街頭塗鴉棒球帽',
        specification: '可調節 / 紅色',
        artist: 'StreetKing_99',
        price: 650,
        quantity: 1,
        image: 'https://placehold.co/50x50?text=Cap',
      },
      {
        id: 'item-5-4',
        name: '星空漸層手機殼',
        specification: 'Pixel 8 Pro',
        artist: 'Alice Art',
        price: 580,
        quantity: 1,
        image: 'https://placehold.co/50x50?text=PhoneCase',
      },
      {
        id: 'item-5-5',
        name: '復古帆布托特包素體',
        specification: '米色 / 大容量',
        artist: '-',
        price: 290,
        quantity: 3,
        image: 'https://placehold.co/50x50?text=Tote',
      }
    ],
  }
];
