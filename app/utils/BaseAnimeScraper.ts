import httpClient from './httpClient';
import { AxiosInstance } from 'axios';
import { load as _load } from 'cheerio';
import { extractUrlLastSegment } from './helpers';

type TAnimeStatus = 'ongoing' | 'finished' | 'unknown';
type TEpisodeQuality = 'SD' | 'HD' | 'FullHD' | '4K' | 'Unknown';
type TLink = { name: string; slug: string };

export type TAnimeCard = {
  title: string;
  slug: string;
  image: string;
  description?: string;
  status?: TAnimeStatus;
  genres?: TLink[];
  quality?: TEpisodeQuality;
  sub?: boolean;
  dub?: boolean;
  ep?: TLink;
};

type TAnimeCardSelectors = {
  [Key in keyof TAnimeCard]: Key extends 'ep'
    ? TLink
    : Key extends 'genres'
    ? TLink[]
    : string;
} & { card: string };

export interface IHomePageData {
  featured: TAnimeCard[];
}

export interface ISearchPageData {
  animes: TAnimeCard[];
}

interface ScraperConfig {
  baseUrl: string;
  endpoints: {
    home: string;
    search: string;
  };
  selectors: {
    home: {
      featured: TAnimeCardSelectors;
    };
    search: {
      animes: TAnimeCardSelectors;
    };
  };
}

class BaseAnimeScraper {
  config: ScraperConfig;
  axios: AxiosInstance;
  load: typeof _load;

  constructor(config: ScraperConfig) {
    this.config = config;
    this.axios = httpClient;
    this.load = _load;
  }

  async scrapeHomePage(): Promise<IHomePageData> {
    const url = this.config.baseUrl + this.config.endpoints.home;
    const res = await this.axios(url);
    const $ = this.load(res.data);

    const sl = this.config.selectors.home;

    const featured: IHomePageData['featured'] =
      $(sl.featured.card)
        .toArray()
        .map((animeElm) => {
          const image = ($(animeElm).find(sl.featured.image).attr('data-src') ||
            $(animeElm).find(sl.featured.image).attr('src')) as string;

          const anime: TAnimeCard = {
            title: $(animeElm).find(sl.featured.title).text().trim(),
            slug: extractUrlLastSegment(
              $(animeElm).find(sl.featured.slug).attr('href')
            ),
            image,
            quality: sl.featured?.quality
              ? ($(animeElm)
                  .find(sl.featured.quality)
                  .text()
                  .trim() as TEpisodeQuality)
              : undefined,
            sub: sl.featured?.sub
              ? $(animeElm).find(sl.featured.sub).text().trim() != ''
              : undefined,
            dub: sl.featured?.dub
              ? $(animeElm).find(sl.featured.dub).text().trim() != ''
              : undefined,
            ep: sl.featured?.ep
              ? {
                  name: $(animeElm).find(sl.featured.ep.name).text().trim(),
                  slug:
                    $(animeElm).find(sl.featured.ep.slug)?.text()?.trim() || '',
                }
              : undefined,
          };

          return anime;
        }) || [];

    return {
      featured,
    };
  }

  async scrapeSearchPage(q: string | null = null): Promise<ISearchPageData> {
    if (!q) throw Error('Search param required');
    const url = this.config.baseUrl + this.config.endpoints.search + q;
    const res = await this.axios(url);
    const $ = this.load(res.data);

    const sl = this.config.selectors.search;

    const animes: TAnimeCard[] =
      $(sl.animes.card)
        .toArray()
        .map((animeElm) => {
          const image = ($(animeElm).find(sl.animes.image).attr('data-src') ||
            $(animeElm).find(sl.animes.image).attr('src')) as string;

          const anime: TAnimeCard = {
            title: $(animeElm).find(sl.animes.title).text().trim(),
            slug: extractUrlLastSegment(
              $(animeElm).find(sl.animes.slug).attr('href')
            ),
            image,
            quality: sl.animes?.quality
              ? ($(animeElm)
                  .find(sl.animes.quality)
                  .text()
                  .trim() as TEpisodeQuality)
              : undefined,
            sub: sl.animes?.sub
              ? $(animeElm).find(sl.animes.sub).text().trim() != ''
              : undefined,
            dub: sl.animes?.dub
              ? $(animeElm).find(sl.animes.dub).text().trim() != ''
              : undefined,
            ep: sl.animes?.ep
              ? {
                  name: $(animeElm).find(sl.animes.ep.name).text().trim(),
                  slug:
                    $(animeElm).find(sl.animes.ep.slug)?.text()?.trim() || '',
                }
              : undefined,
          };

          return anime;
        }) || [];

    console.log({ _animes: animes });

    return { animes };
  }
}

export default BaseAnimeScraper;
