export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
  lastModifiedBy: string;
  lastModifiedAt: string;
}

export interface Vendor {
  id: number;
  email: string;
  name: string;
  companyId: string;
  status: 'active' | 'inactive';
  lastModifiedBy: string;
  lastModifiedAt: string;
}
