import { createElement } from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

const Heading = ({ headingLevel = 'p', children, ...rest }: HeadingProps) => {
  const HeadingComponent = ({
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) =>
    createElement(headingLevel, props, children);

  return <HeadingComponent {...rest}>{children}</HeadingComponent>;
};

export default Heading;
