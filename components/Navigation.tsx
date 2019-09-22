import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { Languages } from '../api/prismicClient';

interface Props {
  locale?: Languages;
  pagination: any;
}

const Navigation: React.FunctionComponent<Props> = ({ pagination: { page, totalPages } }) => {
  if (totalPages === 1) return undefined;
  return (
    <Wrapper>
      {page > 1 ? (<Link href={{ query: { page: page - 1 } }} as={'/'} passHref><Arrow>&larr;</Arrow></Link>) : (<DisabledArrow>&larr;</DisabledArrow>)}
      {page < totalPages ? (<Link href={{ query: { page: page + 1 } }} as={'/'} passHref><Arrow>&rarr;</Arrow></Link>) : (<DisabledArrow>&rarr;</DisabledArrow>)}
    </Wrapper >
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

