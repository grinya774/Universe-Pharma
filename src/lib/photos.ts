const base = `${import.meta.env.BASE_URL}photo/`

export function photoUrl(filename: string) {
  return `${base}${encodeURIComponent(filename)}`
}

/** Реальные карточки WB/Ozon из public/photo */
export const photos = {
  zinc: photoUrl('photo_2026-05-28_22-51-10.jpg'),
  iron: photoUrl('photo_2026-05-28_22-51-10 (2).jpg'),
  magnesium: photoUrl('photo_2026-05-28_22-51-11.jpg'),
  omega: photoUrl('photo_2026-05-28_22-51-11 (2).jpg'),
  d3k2: photoUrl('photo_2026-05-28_22-51-11 (3).jpg'),
  collagen: photoUrl('photo_2026-05-28_22-51-12.jpg'),
  magnesiumLipo: photoUrl('photo_2026-05-28_22-51-12 (2).jpg'),
} as const

export const allPhotos = Object.values(photos)
