import type { Node, Edge } from '@xyflow/react'

export interface WorkflowNodeDetail {
  label: string
  icon: string
  color: string
  kind: 'start' | 'decision' | 'action' | 'result'
  businessValue: string
  metrics: { label: string; value: string }[]
  outcome?: string
}

export const workflowNodeDetails: Record<string, WorkflowNodeDetail> = {
  start: {
    label: 'Новый заказ',
    icon: '🛒',
    color: '#ff6d5a',
    kind: 'start',
    businessValue: 'Система получила заказ с маркетплейса или из Telegram-бота.',
    metrics: [
      { label: 'Заказов сегодня', value: '24' },
      { label: 'Средний чек', value: '1 180 ₽' },
    ],
    outcome: 'Запускается маршрутизация по каналу продаж',
  },
  ch_wb: {
    label: 'Канал: Wildberries',
    icon: '🟣',
    color: '#cb11ab',
    kind: 'decision',
    businessValue: 'Заказ с WB. Проверяем остатки FBO и резервируем партию на заводе.',
    metrics: [
      { label: 'SKU на WB', value: '87' },
      { label: 'Новых заказов', value: '+12' },
      { label: 'CTR карточек', value: '4.8%' },
    ],
    outcome: 'Экономия 2 ч ручной обработки',
  },
  ch_ozon: {
    label: 'Канал: Ozon',
    icon: '🔵',
    color: '#005bff',
    kind: 'decision',
    businessValue: 'Заказ с Ozon Seller. Синхронизация остатков и цен через API.',
    metrics: [
      { label: 'SKU на Ozon', value: '63' },
      { label: 'Новых заказов', value: '+8' },
      { label: 'Рейтинг', value: '4.6★' },
    ],
    outcome: 'Автообновление цен каждые 15 мин',
  },
  ch_tg: {
    label: 'Канал: Telegram',
    icon: '💬',
    color: '#2aabee',
    kind: 'decision',
    businessValue: 'Заказ из бота @universepharma. Подборка уже согласована с анкетой.',
    metrics: [
      { label: 'Подписчиков', value: '205' },
      { label: 'Конверсия бота', value: '18%' },
    ],
    outcome: 'Персональный SKU без звонка менеджеру',
  },
  stock: {
    label: 'Склад Стамбул',
    icon: '🏭',
    color: '#ff9800',
    kind: 'action',
    businessValue: 'Резерв сырья и готовой продукции на складе Esenyurt.',
    metrics: [
      { label: 'В резерве', value: '1 240 уп' },
      { label: 'До отгрузки', value: '2 дня' },
    ],
    outcome: 'Нет out-of-stock на маркетплейсах',
  },
  prod_tabs: {
    label: 'Таблетки / капсулы?',
    icon: '💊',
    color: '#4caf50',
    kind: 'decision',
    businessValue: 'Определяем линию производства по SKU.',
    metrics: [
      { label: 'Линия A', value: 'таблетки' },
      { label: 'Линия B', value: 'капсулы' },
    ],
    outcome: 'Правильная линия = −0 брака',
  },
  prod_line_a: {
    label: 'Линия таблеток',
    icon: '💊',
    color: '#4caf50',
    kind: 'action',
    businessValue: 'Партия UP-T-0341: магний, витамины. GMP-контроль на линии.',
    metrics: [
      { label: 'Партия', value: '960 шт' },
      { label: 'Смена', value: 'Line-A' },
    ],
    outcome: '960 ед за смену',
  },
  prod_line_b: {
    label: 'Линия капсул',
    icon: '💧',
    color: '#26a69a',
    kind: 'action',
    businessValue: 'Партия UP-C-0342: омега, цинк. Лиофилизация пробиотиков.',
    metrics: [
      { label: 'Партия', value: '720 шт' },
      { label: 'Смена', value: 'Line-B' },
    ],
    outcome: '720 ед за смену',
  },
  qc: {
    label: 'Контроль состава',
    icon: '🧪',
    color: '#2196f3',
    kind: 'action',
    businessValue: 'Независимая лаборатория. Без диоксида титана, HALAL.',
    metrics: [
      { label: 'Тесты', value: '12/12 ✓' },
      { label: 'Сертификат', value: 'GMP' },
    ],
    outcome: '100% партий допущены к продаже',
  },
  photo: {
    label: 'Контент для МП',
    icon: '📸',
    color: '#00bcd4',
    kind: 'action',
    businessValue: 'Фото, AI-карточки, SEO-описания на русском.',
    metrics: [
      { label: 'Карточек', value: '12' },
      { label: 'Фото', value: '6 шт' },
    ],
    outcome: '+35% CTR после обновления карточек',
  },
  ai_wb: {
    label: 'Публикация WB',
    icon: '🤖',
    color: '#cb11ab',
    kind: 'result',
    businessValue: 'Карточки загружены на Wildberries. Запущена реклама.',
    metrics: [
      { label: 'Обновлено', value: '6 SKU' },
      { label: 'Бюджет РК', value: '15 000 ₽' },
    ],
    outcome: 'Прогноз +180 заказов/нед',
  },
  ai_ozon: {
    label: 'Публикация Ozon',
    icon: '🤖',
    color: '#005bff',
    kind: 'result',
    businessValue: 'Карточки на Ozon. Промокод UNIVERSE10 для подписчиков.',
    metrics: [
      { label: 'Обновлено', value: '6 SKU' },
      { label: 'Бюджет РК', value: '12 000 ₽' },
    ],
    outcome: 'Прогноз +120 заказов/нед',
  },
  finance: {
    label: 'Бухгалтерия 1C',
    icon: '🧮',
    color: '#795548',
    kind: 'action',
    businessValue: 'Счёт, акт, налоги. Синхронизация с маркетплейсами.',
    metrics: [
      { label: 'Счёт', value: '428 400 ₽' },
      { label: 'Маржа', value: '34%' },
    ],
    outcome: 'Закрытие недели без ручного Excel',
  },
  report: {
    label: 'Отчёт владельцу',
    icon: '📋',
    color: '#607d8b',
    kind: 'result',
    businessValue: 'PDF в Telegram и на email: продажи, маржа, топ-SKU.',
    metrics: [
      { label: 'Получатель', value: 'CEO' },
      { label: 'Период', value: 'неделя' },
    ],
    outcome: 'Решения на данных, не на ощущениях',
  },
}

/** Дерево решений: сверху вниз */
export const workflowNodes: Node[] = [
  { id: 'start', type: 'n8n', position: { x: 380, y: 0 }, data: { nodeId: 'start' } },
  { id: 'ch_wb', type: 'n8n', position: { x: 80, y: 130 }, data: { nodeId: 'ch_wb' } },
  { id: 'ch_ozon', type: 'n8n', position: { x: 380, y: 130 }, data: { nodeId: 'ch_ozon' } },
  { id: 'ch_tg', type: 'n8n', position: { x: 680, y: 130 }, data: { nodeId: 'ch_tg' } },
  { id: 'stock', type: 'n8n', position: { x: 380, y: 260 }, data: { nodeId: 'stock' } },
  { id: 'prod_tabs', type: 'n8n', position: { x: 380, y: 390 }, data: { nodeId: 'prod_tabs' } },
  { id: 'prod_line_a', type: 'n8n', position: { x: 120, y: 520 }, data: { nodeId: 'prod_line_a' } },
  { id: 'prod_line_b', type: 'n8n', position: { x: 640, y: 520 }, data: { nodeId: 'prod_line_b' } },
  { id: 'qc', type: 'n8n', position: { x: 380, y: 650 }, data: { nodeId: 'qc' } },
  { id: 'photo', type: 'n8n', position: { x: 380, y: 780 }, data: { nodeId: 'photo' } },
  { id: 'ai_wb', type: 'n8n', position: { x: 120, y: 910 }, data: { nodeId: 'ai_wb' } },
  { id: 'ai_ozon', type: 'n8n', position: { x: 640, y: 910 }, data: { nodeId: 'ai_ozon' } },
  { id: 'finance', type: 'n8n', position: { x: 380, y: 1040 }, data: { nodeId: 'finance' } },
  { id: 'report', type: 'n8n', position: { x: 380, y: 1170 }, data: { nodeId: 'report' } },
]

export const workflowEdges: Edge[] = [
  { id: 'e1', source: 'start', target: 'ch_wb', label: 'WB' },
  { id: 'e2', source: 'start', target: 'ch_ozon', label: 'Ozon' },
  { id: 'e3', source: 'start', target: 'ch_tg', label: 'TG' },
  { id: 'e4', source: 'ch_wb', target: 'stock' },
  { id: 'e5', source: 'ch_ozon', target: 'stock' },
  { id: 'e6', source: 'ch_tg', target: 'stock' },
  { id: 'e7', source: 'stock', target: 'prod_tabs' },
  { id: 'e8', source: 'prod_tabs', target: 'prod_line_a', label: 'таблетки' },
  { id: 'e9', source: 'prod_tabs', target: 'prod_line_b', label: 'капсулы' },
  { id: 'e10', source: 'prod_line_a', target: 'qc' },
  { id: 'e11', source: 'prod_line_b', target: 'qc' },
  { id: 'e12', source: 'qc', target: 'photo' },
  { id: 'e13', source: 'photo', target: 'ai_wb', label: 'WB' },
  { id: 'e14', source: 'photo', target: 'ai_ozon', label: 'Ozon' },
  { id: 'e15', source: 'ai_wb', target: 'finance' },
  { id: 'e16', source: 'ai_ozon', target: 'finance' },
  { id: 'e17', source: 'finance', target: 'report' },
]
