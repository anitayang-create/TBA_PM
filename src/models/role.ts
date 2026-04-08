export interface Permission {
  module: string;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface Role {
  id: number;
  name: string;
  boundUsersCount: number;
  createdAt: string;
  isDeletable: boolean;
  permissions: Permission[];
}

export const AVAILABLE_MODULES = ['使用者管理', '角色管理', '商品管理'];

const getFullPermissions = (isFull: boolean): Permission[] => 
  AVAILABLE_MODULES.map(module => ({
    module,
    read: true,
    create: isFull,
    update: isFull,
    delete: isFull,
  }));

export const initialRoles: Role[] = [
  {
    id: 1,
    name: '超級管理員',
    boundUsersCount: 2,
    createdAt: '2023-11-01 10:00:00',
    isDeletable: false,
    permissions: getFullPermissions(true),
  },
  {
    id: 2,
    name: '客服人員',
    boundUsersCount: 5,
    createdAt: '2023-11-01 11:00:00',
    isDeletable: true,
    permissions: getFullPermissions(false),
  },
  {
    id: 3,
    name: '行銷人員',
    boundUsersCount: 3,
    createdAt: '2023-11-02 09:30:00',
    isDeletable: true,
    permissions: AVAILABLE_MODULES.map(module => ({
      module,
      read: true,
      create: module === '商品管理',
      update: module === '商品管理',
      delete: false,
    })),
  },
];
