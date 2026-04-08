export type ContentStatus = 'ON_SHELF' | 'OFF_SHELF' | 'SCHEDULED';

export interface Banner {
  id: string;
  title: string;
  desktopImage: string;
  mobileImage: string;
  targetUrl: string;
  startTime?: string;
  endTime?: string;
  sortOrder: number;
  status: ContentStatus;
}

export type FAQCategory = 'ACCOUNT' | 'ORDER' | 'REFUND';

export interface FAQ {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  sortOrder: number;
  status: 'ON_SHELF' | 'OFF_SHELF';
  createdAt: string;
}

export const FAQ_CATEGORY_LABELS: Record<FAQCategory, string> = {
  ACCOUNT: '帳號問題',
  ORDER: '訂單配送',
  REFUND: '退換貨政策',
};

export const initialBanners: Banner[] = [
  {
    id: 'B001',
    title: '2025 春季新品上市',
    desktopImage: 'https://placehold.co/1920x800?text=Spring+New+Arrivals+Desktop',
    mobileImage: 'https://placehold.co/800x1000?text=Spring+New+Arrivals+Mobile',
    targetUrl: '/collection/spring-2025',
    sortOrder: 1,
    status: 'ON_SHELF',
  },
  {
    id: 'B002',
    title: '創作者徵件計畫',
    desktopImage: 'https://placehold.co/1920x800?text=Artist+Recruitment+Desktop',
    mobileImage: 'https://placehold.co/800x1000?text=Artist+Recruitment+Mobile',
    targetUrl: '/artist-join',
    sortOrder: 2,
    status: 'SCHEDULED',
    startTime: '2025-05-01 00:00',
    endTime: '2025-05-31 23:59',
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'F001',
    category: 'ACCOUNT',
    question: '忘記密碼該怎麼辦？',
    answer: '請點擊登入頁面的「忘記密碼」，輸入您的註冊 Email，系統將會寄送重設密碼信件給您。',
    sortOrder: 1,
    status: 'ON_SHELF',
    createdAt: '2025-01-10 10:00',
  },
  {
    id: 'F002',
    category: 'ORDER',
    question: '下單後多久會出貨？',
    answer: '一般商品的製作與交期約為 7-10 個工作天；素體商品約為 3-5 個工作天。具體交期請參考商品頁面說明。',
    sortOrder: 1,
    status: 'ON_SHELF',
    createdAt: '2025-01-12 14:30',
  },
  {
    id: 'F003',
    category: 'REFUND',
    question: '收到瑕疵品可以退貨嗎？',
    answer: '若您收到的商品有瑕疵，請於收到商品後 7 天內連繫客服，並提供照片佐證。經確認後我們將安排退款或重新製作。',
    sortOrder: 1,
    status: 'ON_SHELF',
    createdAt: '2025-01-15 09:15',
  }
];
