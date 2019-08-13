import SmoothScroll from 'smooth-scroll'
import 'normalize.css'
import 'typeface-arvo'
import 'typeface-cabin'

let scrolls = []

export const onRouteUpdate = () => {
  const instance = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
  })

  scrolls.push(instance)
}

export const onPreRouteUpdate = () => {
  scrolls.splice(0).forEach(instance => instance.destroy())
}
