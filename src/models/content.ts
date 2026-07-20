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

export type FAQCategory = 'Member' | 'Artist';

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
  Member: '一般會員',
  Artist: '藝術家會員',
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
    category: 'Member',
    question: '忘記密碼該怎麼辦？',
    answer: '請點擊登入頁面的「忘記密碼」，輸入您的註冊 Email，系統將會寄送重設密碼信件給您。',
    sortOrder: 1,
    status: 'ON_SHELF',
    createdAt: '2025-01-10 10:00',
  },
  {
    id: 'F002',
    category: 'Member',
    question: '下單後多久會出貨？',
    answer: '一般商品的製作與交期約為 <b>7-10 個工作天</b>；素體商品約為 <b>3-5 個工作天</b>。具體交期請參考商品頁面說明。如有疑問請聯繫 <a href="https://www.tba.tw" target="_blank">www.tba.tw</a> 客服。',
    sortOrder: 2,
    status: 'ON_SHELF',
    createdAt: '2025-01-12 14:30',
  },
  {
    id: 'F003',
    category: 'Artist',
    question: '如何申請成為 TBA 藝術家？',
    answer: '請至 <a href="https://www.tba.tw/artist-join" target="_blank">www.tba.tw/artist-join</a> 填寫申請表單，並上傳您的作品集（至少 5 件）。審核時間約 <b>5-7 個工作天</b>，審核結果將以 Email 通知。<br/>＊ 請確保作品為個人原創，避免版權爭議。',
    sortOrder: 1,
    status: 'ON_SHELF',
    createdAt: '2025-02-01 09:00',
  },
  {
    id: 'F004',
    category: 'Artist',
    question: '藝術家的抽成比例是多少？',
    answer: '藝術家每筆銷售將獲得 <b>定價的 15%</b> 作為版稅收入。收益結算於每月底進行，並於次月 15 日前撥款至您的指定帳戶。<br/>＊ 詳細條款請參閱藝術家合作協議。',
    sortOrder: 2,
    status: 'ON_SHELF',
    createdAt: '2025-02-01 09:30',
  },
];
