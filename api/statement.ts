import { RichText } from 'prismic-dom';

export default (response) => ({
  uid: response.uid,
  title: RichText.asText(response.data.title),
  description: response.data.description,
  id: response.id
});
