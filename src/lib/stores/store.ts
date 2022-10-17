import { derived, writable } from 'svelte/store'

export const pageStore = writable(false)

export const isOverlayOpen = writable(false)

export const isMenuOpen = writable(false)

export const noScroll = derived([isOverlayOpen, isMenuOpen], ([a$, b$]) => a$ || b$)
