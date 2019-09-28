import cookie from 'js-cookie';
import Router from 'next/router';
import * as React from 'react';
import styled from 'styled-components';
import { Languages } from '../api/prismicClient';

interface LanguageSwitcherProps {
  locale?: Languages;
}

const LanguageSwitcher: React.FunctionComponent<LanguageSwitcherProps> = ({ locale }) => {
  return (
    <Wrapper>
      <Flag locale={locale || Languages.en} value={Languages.ru} emoji={'🇷🇺'} />
      <Flag locale={locale || Languages.en} value={Languages.en} emoji={'🇺🇸'} />
    </Wrapper>
  );
};

export default LanguageSwitcher;

const setCookie = (locale: Languages) => {
  console.log(Router.pathname);
  cookie.set('locale', locale, { path: '/' });
  const { slug } = Router.query;
  const date = new Date().getTime();
  const href = slug ? `/index?slug=${slug}&locale=${locale}&update=${date}` : `${Router.pathname}?update=${date}&locale=${locale}`;
  const as = slug ? `/${locale}/${slug}` : `/${locale}`;
  Router.push(href, as);
};

const Wrapper = styled.div`
  background-color: #8091a5;
  display: flex;
  flex-flow: row nowrap;
`;

interface FlagProps {
  locale: Languages;
  value: Languages;
  emoji: string;
}

const Flag: React.FunctionComponent<FlagProps> = ({ value, locale, emoji }) => {
  const isCurrent = locale === value;
  return (
    <FlagSwitcher
      onClick={() => { if (!isCurrent) setCookie(value); }}
      className={isCurrent ? 'disabled' : 'active'}
      role='img'
      aria-hidden='true'>
      {emoji}
    </FlagSwitcher>
  );
};

const FlagSwitcher = styled.div`
  display: block;
  color: #fff;
  text-align: center;
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 10px;
  border: 1px solid transparent;
  border-radius: 50%;
  transition: .5s all;
  &:hover {
    border-color: #fff;
  }
  &.active {
    cursor: pointer;
  }
  &.disabled {
    opacity: .4;
    cursor: normal;
    &:hover {
      opacity: 1;
      border-color: rgba(255,255,255,.1);
    }
  }
`;
