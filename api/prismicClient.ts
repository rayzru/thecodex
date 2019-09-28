import { NextPageContext } from 'next';
import Prismic from 'prismic-javascript';
import { PRISMIC_API_URL } from '../config/prismic';
import pagination from './pagination';
import statement from './statement';

export enum Languages {
  en = 'en-us',
  ru = 'ru'
}

export class PrismicClient {
  private url: string;
  private ref: string;
  private client: any;
  private req: any;
  private locale: Languages = Languages.en;

  constructor({ req = undefined } = {}, locale = Languages.en, ref = undefined) {
    this.url = PRISMIC_API_URL;
    this.req = req;
    this.ref = ref;
    this.locale = locale;
  }

  private get api() {
    if (!this.client) {
      this.client = Prismic.getApi(this.url, { req: this.req });
    }
    return this.client;
  }

  private query = (predicates?, options?) => this.api
    .then((api: any) => (api.query(predicates, { ...options, lang: this.locale })))

  allByType = (type: string, options = {}, predicates = []) => (
    this.query([Prismic.Predicates.at('document.type', type) as never, ...predicates], { ...options, lang: this.locale, ref: this.ref })
      .then((response: any) => ({ pagination: pagination(response), results: response.results }))
  )

  allByTags = (tags: string[], options?: any, predicates?: string[], strict = true) => (
    this.query([
      ...predicates as never[],
      strict
        ? Prismic.Predicates.at('document.tags', Array.isArray(tags) ? [...tags] : [tags]) as never
        : Prismic.Predicates.any('document.tags', Array.isArray(tags) ? [...tags] : [tags]) as never,
    ], { ...options, lang: this.locale, ref: this.ref })
  )

  oneByType = (type: string, uid: string, options?: any) => {
    if (!uid) return this.allByType(type, options);
    return this.query(Prismic.Predicates.at(`my.${type}.uid`, uid) as never, { ...options, lang: this.locale, ref: this.ref })
      .then((results: any) => results[0]);
  }

  single = (type: string, options?: any) => (
    this.api
      .then((api: any) => api.getSingle(type, { ...options, lang: this.locale, ref: this.ref, }))
  );

  getStatements = async (options: any = {}) => (
    this.allByType('statement', { orderings: '[document.last_publication_date desc]', page: 1, pageSize: 1, ...options })
      .then((res: any) => handleStatementResult(res))
  );

  getStatement = async (slug) => (
    this.allByType('statement', {}, [Prismic.Predicates.at('my.statement.uid', slug)])
      .then((res: any) => handleStatementResult(res))
  );

  getAbout = async () => (
    this.single('about').then(res => ({ slices: res.data.body }))
  );

}

export const prismicClient = (context: NextPageContext, locale?: Languages) => new PrismicClient(context, locale);

const handleStatementResult = (statementResponse) => ({
  statements: statementResponse.results.map((s: any) => statement(s)),
  pagination: statementResponse.pagination,
});
