import h from 'hyperscript'
import moment from 'moment'

import 'lazysizes'
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

const relativeDate = dateStr => moment(dateStr, 'YYYY-MM-DD').fromNow()

const Controls = ({ slug, youtubeVideoId }) =>
  h(
    'div',
    h(
      'a',
      {
        href: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
        title: 'Watch trailer',
        target: '_blank',
        rel: 'noreferrer',
      },
      h('img', {
        src: 'assets/play-icon.png',
        alt: 'Play',
      })
    ),
    h(
      'a',
      {
        href: `https://kitsu.io/explore/anime/${slug}`,
        title: 'See more',
        target: '_blank',
        rel: 'noreferrer',
      },
      h('img', {
        src: 'assets/plus-icon.png',
        alt: 'More info',
      })
    )
  )



const options = {
  root: null, // el elemento que se toma como punto de referencia para el observer
  rootMargin: '0px', // margen adicional que se agrega al elemento de referencia
  threshold: 1.0, // porcentaje de intersección requerido para ejecutar el callback
}

const callback = (entries, observer) => {
  entries.forEach(entry => {
    // Aquí se puede verificar si el elemento es visible o no
    if (entry.isIntersecting) {
      console.log('El elemento es visible', observer)
    } else {
      console.log('El elemento no es visible')
    }
  })
}
const observer = new IntersectionObserver(callback, options)

const targetElement = document
  .querySelectorAll('div.carousel-item')
  .forEach(img => observer.observe(img))
// observer.observe(targetElement)

const CarouselItem = ({
  imageUrl,
  title,
  subtitle,
  slug,
  youtubeVideoId,
  startDate,
}) => 
  h(
    'div.carousel-item',
    h('img', { src: imageUrl, alt: ' ', loading: 'lazy' }),
    h(
      'div',
      Controls({ slug, youtubeVideoId }),
      h('p', title),
      h('p', subtitle),
      h('p', `Released: ${relativeDate(startDate)}`)
    )
  )

export default CarouselItem
