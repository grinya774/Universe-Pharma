import type { Node, Edge } from '@xyflow/react'

export const workflowNodes: Node[] = [
  { id: '1', type: 'n8n', position: { x: 0, y: 200 }, data: { label: 'Заказ WB / Ozon', icon: '🛒', color: '#ff6d5a' } },
  { id: '2', type: 'n8n', position: { x: 220, y: 200 }, data: { label: 'Склад Стамбул', icon: '🏭', color: '#ff9800' } },
  { id: '3', type: 'n8n', position: { x: 440, y: 200 }, data: { label: 'Производство таблеток', icon: '💊', color: '#4caf50' } },
  { id: '4', type: 'n8n', position: { x: 660, y: 200 }, data: { label: 'Контроль состава', icon: '🧪', color: '#2196f3' } },
  { id: '5', type: 'n8n', position: { x: 880, y: 200 }, data: { label: 'Упаковка и маркировка', icon: '📦', color: '#9c27b0' } },
  { id: '6', type: 'n8n', position: { x: 1100, y: 200 }, data: { label: 'Фото для маркетплейса', icon: '📸', color: '#00bcd4' } },
  { id: '7', type: 'n8n', position: { x: 1320, y: 200 }, data: { label: 'AI карточка WB/Ozon', icon: '🤖', color: '#2dd4a8' } },
  { id: '8', type: 'n8n', position: { x: 1540, y: 200 }, data: { label: 'Реклама и ставки', icon: '📢', color: '#e91e63' } },
  { id: '9', type: 'n8n', position: { x: 1760, y: 200 }, data: { label: 'Бухгалтерия 1C', icon: '🧮', color: '#795548' } },
  { id: '10', type: 'n8n', position: { x: 1980, y: 200 }, data: { label: 'Отчёт владельцу', icon: '📊', color: '#607d8b' } },
]

export const workflowEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: false },
  { id: 'e2-3', source: '2', target: '3', animated: false },
  { id: 'e3-4', source: '3', target: '4', animated: false },
  { id: 'e4-5', source: '4', target: '5', animated: false },
  { id: 'e5-6', source: '5', target: '6', animated: false },
  { id: 'e6-7', source: '6', target: '7', animated: false },
  { id: 'e7-8', source: '7', target: '8', animated: false },
  { id: 'e8-9', source: '8', target: '9', animated: false },
  { id: 'e9-10', source: '9', target: '10', animated: false },
]

export const nodePayloads: Record<string, object> = {
  '1': { order_id: 'WB-2847193', product: 'Мультибиотик 20 капс', qty: 48 },
  '2': { warehouse: 'Esenyurt, Istanbul', stock: 1240, status: 'reserved' },
  '3': { batch: 'UP-2026-0341', capsules: 960, line: 'Line-A' },
  '4': { strains: 18, cfu: '50B', titanium_dioxide: false, passed: true },
  '5': { barcode: '4607123456789', label: 'RU/TR', boxes: 48 },
  '6': { photos: 6, resolution: '2000x2000', bg_removed: true },
  '7': { marketplace: ['WB', 'Ozon'], cards_updated: 12, ai_model: 'card-gen-v2' },
  '8': { campaign: 'probiotic-spring', budget: 15000, ctr: '4.2%' },
  '9': { invoice: 'INV-2026-0891', amount: 428400, currency: 'RUB' },
  '10': { report: 'weekly_summary.pdf', sent_to: 'info@universepharma.ru' },
}
