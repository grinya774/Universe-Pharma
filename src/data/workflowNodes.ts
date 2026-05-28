import type { Node, Edge } from '@xyflow/react'

/** Ветвистый workflow: WB / Ozon, производство, AI, маркетинг */
export const workflowNodes: Node[] = [
  { id: '1', type: 'n8n', position: { x: 400, y: 0 }, data: { label: 'Новый заказ', icon: '🛒', color: '#ff6d5a' } },

  { id: '2a', type: 'n8n', position: { x: 80, y: 120 }, data: { label: 'Wildberries API', icon: '🟣', color: '#cb11ab' } },
  { id: '2b', type: 'n8n', position: { x: 400, y: 120 }, data: { label: 'Ozon Seller API', icon: '🔵', color: '#005bff' } },
  { id: '2c', type: 'n8n', position: { x: 720, y: 120 }, data: { label: 'Telegram заказ', icon: '💬', color: '#2aabee' } },

  { id: '3', type: 'n8n', position: { x: 400, y: 240 }, data: { label: 'Склад Стамбул', icon: '🏭', color: '#ff9800' } },

  { id: '4a', type: 'n8n', position: { x: 120, y: 360 }, data: { label: 'Линия таблеток', icon: '💊', color: '#4caf50' } },
  { id: '4b', type: 'n8n', position: { x: 400, y: 360 }, data: { label: 'Линия капсул', icon: '💧', color: '#26a69a' } },
  { id: '4c', type: 'n8n', position: { x: 680, y: 360 }, data: { label: 'Спреи / жидкости', icon: '🧴', color: '#66bb6a' } },

  { id: '5', type: 'n8n', position: { x: 400, y: 480 }, data: { label: 'Контроль состава', icon: '🧪', color: '#2196f3' } },

  { id: '6a', type: 'n8n', position: { x: 160, y: 600 }, data: { label: 'Фотосъёмка', icon: '📸', color: '#00bcd4' } },
  { id: '6b', type: 'n8n', position: { x: 400, y: 600 }, data: { label: 'SEO тексты', icon: '✍️', color: '#7e57c2' } },
  { id: '6c', type: 'n8n', position: { x: 640, y: 600 }, data: { label: 'Перевод TR→RU', icon: '🌐', color: '#5c6bc0' } },

  { id: '7a', type: 'n8n', position: { x: 80, y: 720 }, data: { label: 'AI карточка WB', icon: '🤖', color: '#cb11ab' } },
  { id: '7b', type: 'n8n', position: { x: 320, y: 720 }, data: { label: 'AI карточка Ozon', icon: '🤖', color: '#005bff' } },
  { id: '7c', type: 'n8n', position: { x: 560, y: 720 }, data: { label: 'Telegram пост', icon: '📢', color: '#2aabee' } },

  { id: '8a', type: 'n8n', position: { x: 200, y: 840 }, data: { label: 'Реклама WB', icon: '📈', color: '#e91e63' } },
  { id: '8b', type: 'n8n', position: { x: 500, y: 840 }, data: { label: 'Реклама Ozon', icon: '📊', color: '#ff5722' } },

  { id: '9', type: 'n8n', position: { x: 400, y: 960 }, data: { label: 'Бухгалтерия 1C', icon: '🧮', color: '#795548' } },

  { id: '10', type: 'n8n', position: { x: 400, y: 1080 }, data: { label: 'Отчёт владельцу', icon: '📋', color: '#607d8b' } },
]

export const workflowEdges: Edge[] = [
  { id: 'e1-2a', source: '1', target: '2a' },
  { id: 'e1-2b', source: '1', target: '2b' },
  { id: 'e1-2c', source: '1', target: '2c' },
  { id: 'e2a-3', source: '2a', target: '3' },
  { id: 'e2b-3', source: '2b', target: '3' },
  { id: 'e2c-3', source: '2c', target: '3' },
  { id: 'e3-4a', source: '3', target: '4a' },
  { id: 'e3-4b', source: '3', target: '4b' },
  { id: 'e3-4c', source: '3', target: '4c' },
  { id: 'e4a-5', source: '4a', target: '5' },
  { id: 'e4b-5', source: '4b', target: '5' },
  { id: 'e4c-5', source: '4c', target: '5' },
  { id: 'e5-6a', source: '5', target: '6a' },
  { id: 'e5-6b', source: '5', target: '6b' },
  { id: 'e5-6c', source: '5', target: '6c' },
  { id: 'e6a-7a', source: '6a', target: '7a' },
  { id: 'e6a-7b', source: '6a', target: '7b' },
  { id: 'e6b-7a', source: '6b', target: '7a' },
  { id: 'e6b-7b', source: '6b', target: '7b' },
  { id: 'e6c-7c', source: '6c', target: '7c' },
  { id: 'e7a-8a', source: '7a', target: '8a' },
  { id: 'e7b-8b', source: '7b', target: '8b' },
  { id: 'e7c-8a', source: '7c', target: '8a' },
  { id: 'e8a-9', source: '8a', target: '9' },
  { id: 'e8b-9', source: '8b', target: '9' },
  { id: 'e9-10', source: '9', target: '10' },
]

/** Порядок анимации: группы = параллельные ветки */
export const executionSteps: string[][] = [
  ['1'],
  ['2a', '2b', '2c'],
  ['3'],
  ['4a', '4b', '4c'],
  ['5'],
  ['6a', '6b', '6c'],
  ['7a', '7b', '7c'],
  ['8a', '8b'],
  ['9'],
  ['10'],
]

export const nodePayloads: Record<string, object> = {
  '1': { orders: 24, channels: ['WB', 'Ozon', 'Telegram'] },
  '2a': { sku: 87, new_orders: 12, api: 'wildberries' },
  '2b': { sku: 63, new_orders: 8, api: 'ozon-seller' },
  '2c': { subscribers: 205, orders: 3 },
  '3': { warehouse: 'Esenyurt', stock_reserved: 1240 },
  '4a': { line: 'tablets', batch: 'UP-T-0341' },
  '4b': { line: 'capsules', batch: 'UP-C-0342' },
  '4c': { line: 'liquids', batch: 'UP-L-0343' },
  '5': { qc: 'passed', lab: 'independent', gmp: true },
  '6a': { photos: 6, bg_removed: true },
  '6b': { seo_cards: 12, lang: 'RU' },
  '6c': { tr_ru: true, terms_ok: true },
  '7a': { ai: 'card-gen-v2', marketplace: 'WB', cards: 6 },
  '7b': { ai: 'card-gen-v2', marketplace: 'Ozon', cards: 6 },
  '7c': { channel: '@universepharma', post_scheduled: true },
  '8a': { budget: 15000, ctr: '4.8%', platform: 'WB' },
  '8b': { budget: 12000, ctr: '3.9%', platform: 'Ozon' },
  '9': { invoice: 'INV-0891', amount: 428400, currency: 'RUB' },
  '10': { report: 'weekly.pdf', email: 'info@universepharma.ru' },
}
