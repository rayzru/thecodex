import { PrismicDocumentWithUID, RichTextField } from '@prismicio/types';

interface StatementInterface {
  title: RichTextField;
  description: RichTextField;
  excerpt: string;
}

export interface Statement extends PrismicDocumentWithUID {
  data: StatementInterface;
}
