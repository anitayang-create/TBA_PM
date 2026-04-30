export interface AuditLog {
  id: string;
  actionTime: string;    // 操作時間
  operator: string;      // 操作人員
  module: string;        // 操作模組
  action: string;        // 執行動作
  target: string;        // 影響目標
}
