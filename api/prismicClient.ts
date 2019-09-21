import { NextPageContext } from 'next';
import { RichText } from 'prismic-dom';
import Prismic from 'prismic-javascript';
import { PRISMIC_API_URL } from '../config/prismic';
import pagination from './pagination';

export enum Languages {
  en = 'en-us',
  ru = 'ru'
}

export class PrismicClient {
  private url: string;
  private client: any;
  private req: any;
  private lang: Languages = Languages.en;

  constructor({ req = undefined } = {}) {
    this.url = PRISMIC_API_URL;
    this.req = req;
  }

  get api() {
    if (!this.client) {
      this.client = Prismic.getApi(this.url, { req: this.req });
    }
    return this.client;
  }

  private query = (predicates?, options?) => this.api
    .then((api: any) => (api.query(predicates, { ...options, lang: this.lang })))

  allByType = (type: string, options = {}, predicates = []) => (
    this.query([Prismic.Predicates.at('document.type', type) as never, ...predicates], { ...options, lang: this.lang })
      .then((response: any) => ({ pagination: pagination(response), results: response.results }))
  )

  allByTags = (tags: string[], options?: any, predicates?: string[], strict = true) => (
    this.query([
      ...predicates as never[],
      strict
        ? Prismic.Predicates.at('document.tags', Array.isArray(tags) ? [...tags] : [tags]) as never
        : Prismic.Predicates.any('document.tags', Array.isArray(tags) ? [...tags] : [tags]) as never,
    ], { ...options, lang: this.lang })
  )

  oneByType = (type: string, uid: string, options?: any) => {
    if (!uid) return this.allByType(type, options);
    return this.query(Prismic.Predicates.at(`my.${type}.uid`, uid) as never, { ...options, lang: this.lang })
      .then((results: any) => results[0]);
  }

  single = (type: string, options?: any) => (
    this.api
      .then((api: any) => api.getSingle(type, { ...options, lang: this.lang }))
  )

  getLastStatement = async () => (
    this.allByType('statement', { orderings: '[document.last_publication_date desc]', page: 1, pageSize: 1 }, [])
      .then((res: any) => res.results[0])
      .then((res: any) => handleStatementResult(res))
  )

  getStatement = async (slug) => (
    this.allByType('statement', {}, [Prismic.Predicates.at('my.statement.uid', slug)])
      .then((res: any) => res.results[0])
      .then((res: any) => handleStatementResult(res))
      .catch(error => { throw new Error('Unknown Link'); console.log(error); })
  )
}

export const prismicClient = (context: NextPageContext) => new PrismicClient(context);

const handleStatementResult = (statementResponse) => ({
  id: statementResponse.id,
  uid: statementResponse.uid,
  title: RichText.asText(statementResponse.data.title),
  description: RichText.asHtml(statementResponse.data.description)
});
