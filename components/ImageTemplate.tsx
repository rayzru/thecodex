import { SiteSettings } from 'lib/settings';

export interface ImageTemplateProps {
  title: string;
  description?: string | null;
  settings?: SiteSettings | null;
}

const ImageTemplate: React.FC<ImageTemplateProps> = ({
  title,
  description,
}) => {
  return (
    <article>
      <h1>{title}</h1>
      <div>{description}</div>
    </article>
  );
};

export default ImageTemplate;
