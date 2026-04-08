export const HERO_EASE = [0.22, 1, 0.36, 1] as const

export const SECTION_REVEAL = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.50, delay: i * 0.08, ease: HERO_EASE },
  }),
}

export const CARD_REVEAL = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.44, delay: i * 0.06, ease: HERO_EASE },
  }),
}
