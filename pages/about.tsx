import cookie from 'js-cookie';
import { RichText } from 'prismic-reactjs';
import * as React from 'react';
import styled from 'styled-components';
import { Languages, prismicClient } from '../api/prismicClient';
import Layout from '../components/Layout';

const sliceRenderer = (slices) => (
  slices.map((slice: any, index: number) => {
    if (slice.slice_type === 'text') {
      return (
        <React.Fragment key={index}>
          {RichText.render(slice.primary.text)}
        </React.Fragment>
      );
    }
  })
);

const About = ({ locale, slices }) => (
  <Layout locale={locale}>
    <Article>
      {sliceRenderer(slices)}
    </Article>
  </Layout >
);

About.getInitialProps = async ({ req, ctx }) => {
  const locale = (req) ? Languages.en : cookie.get('locale') as Languages || Languages.en;
  const client = prismicClient(ctx, locale);
  const about = await client.getAbout();
  return { ...about, locale };
};

export default About;


const Article = styled.article`
  font-family: 'Montserrat', sans-serif;
  line-height: 1.2em;
  margin-left: 20px;
  color: #fff;
  margin-top: 10vh;
`;
