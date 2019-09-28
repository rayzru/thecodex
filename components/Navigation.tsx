import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { Languages } from '../api/prismicClient';

interface Props {
  locale?: Languages;
  page: number;
  totalPages: number;
  slug: string;
}

const Navigation: React.FunctionComponent<Props> = ({ locale, page, totalPages, slug }) => {
  if (slug) {
    return (
      <Wrapper>
        <Link href={`/index?locale=${locale}`} as={`/${locale}`} passHref>
          <Arrow>&uarr;</Arrow>
        </Link>
      </Wrapper>
    );
  }

  if (totalPages === 1) return (<Wrapper />);

  return (
    <Wrapper>
      {page > 1 ? (<Link href={{ pathname: '/index', query: { page: page - 1, locale } }} as={`/${locale}`} passHref><Arrow>&larr;</Arrow></Link>) : (<DisabledArrow>&larr;</DisabledArrow>)}
      {page < totalPages ? (<Link href={{ pathname: '/index', query: { page: page + 1, locale } }} as={`/${locale}`} passHref><Arrow>&rarr;</Arrow></Link>) : (<DisabledArrow>&rarr;</DisabledArrow>)}
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled.div`
  flex: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-flow: row nowrap;
`;


const PaginationControl = styled.a`
  text-decoration: none;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  margin: 10px;
  font-size: 30px;
`;

const Arrow = styled(PaginationControl)`

`;

const DisabledArrow = styled(PaginationControl)`
  color: #ccc;
`;

