import httpClient from './httpClient';
import { AxiosInstance } from 'axios';
import { load as _load } from 'cheerio';
import { extractUrlLastSegment } from './helpers';

type TAnimeStatus = 'ongoing' | 'finished' | 'unknown';
type TEpisodeQuality = 'SD' | 'HD' | 'FullHD' | '4K' | 'Unknown';
type TLink = { name: string; slug: string };

type TAnimeCard = {
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

interface IHomePageData {
  featured: TAnimeCard[];
}

interface ScraperConfig {
  baseUrl: string;
  endpoints: {
    home: string;
  };
  selectors: {
    home: {
      featured: {
        [Key in keyof TAnimeCard]: Key extends 'ep'
          ? TLink
          : Key extends 'genres'
          ? TLink[]
          : string;
      } & { card: string };
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
}

export default BaseAnimeScraper;
