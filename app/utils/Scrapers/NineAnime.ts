import BaseAnimeScraper from '../BaseAnimeScraper';

const nineAnime = new BaseAnimeScraper({
  baseUrl: 'https://9animetv.to',
  endpoints: {
    home: '/home',
    search: '/search?keyword=',
  },
  selectors: {
    home: {
      featured: {
        card: '.film_list-wrap .flw-item',
        title: '.film-detail > .film-name > a',
        quality: '.tick-quality',
        sub: '.tick-item.tick-sub',
        dub: '.tick-item.tick-dub',
        image: '.film-poster-img',
        slug: 'a.film-poster-ahref',
        ep: {
          name: '.tick-item.tick-eps',
          slug: '',
        },
      },
    },
    search: {
      animes: {
        card: '.film_list-wrap .flw-item',
        title: '.film-detail > .film-name > a',
        quality: '.tick-quality',
        sub: '.tick-item.tick-sub',
        dub: '.tick-item.tick-dub',
        image: '.film-poster-img',
        slug: 'a.film-poster-ahref',
        ep: {
          name: '.tick-item.tick-eps',
          slug: '',
        },
      },
    },
  },
});

export default nineAnime;
