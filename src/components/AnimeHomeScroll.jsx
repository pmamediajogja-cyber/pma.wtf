import { useEffect } from 'react'
import { animate, onScroll, stagger } from 'animejs'

export default function AnimeHomeScroll() {
  useEffect(() => {
    const animations = []

    const square = document.querySelector('.hero-scroll-square')
    if (square) {
      animations.push(
        animate(square, {
          x: '12rem',
          rotate: '1turn',
          scale: [1, 1.12],
          ease: 'linear',
          autoplay: onScroll({
            enter: 'bottom-=20 top',
            leave: 'top+=80 bottom',
            sync: 0.22,
          }),
        })
      )
    }

    const heroCopy = document.querySelector('.hero-copy')
    if (heroCopy) {
      animations.push(
        animate(heroCopy, {
          translateY: ['0rem', '5rem'],
          opacity: [1, 0.35],
          ease: 'linear',
          autoplay: onScroll({
            enter: 'bottom top+=15%',
            leave: 'top+=35% top',
            sync: 0.35,
          }),
        })
      )
    }

    const cards = document.querySelectorAll('.design-card')
    if (cards.length) {
      animations.push(
        animate(cards, {
          translateY: ['3rem', '0rem'],
          opacity: [0.45, 1],
          delay: stagger(70),
          ease: 'out(4)',
          autoplay: onScroll({
            enter: 'bottom-=80 bottom',
            leave: 'top+=80 top',
            sync: 0.28,
          }),
        })
      )
    }

    return () => {
      animations.forEach((animation) => animation.pause?.())
    }
  }, [])

  return null
}
