import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import s from './Home.module.scss';

const data = {
  firstColumn: [
    {
      name: 'MyCryptoCheckout',
      category: 'Payments',
      goal: '$240,000',
      interest: 'Sponsored',
      dateActive: '3d left',
    },
    {
      name: 'Coin98 Labs',
      category: 'Platform',
      goal: '$3,750,000',
      interest: 'Not Rated',
      dateActive: '4d left',
    },
    {
      name: 'Hi',
      category: 'Blockchain Service',
      goal: 'NOT SET',
      interest: 'Not Rated',
      dateActive: 'TBA',
    },
    {
      name: 'Altair',
      category: 'Blockchain Service',
      goal: 'NOT SET',
      interest: 'Not Rated',
      dateActive: 'TBA',
    },
  ],
  secondColumn: [
    {
      name: 'PolkaCipher',
      category: 'Blockchain Service',
      goal: '$2,020,000',
      interest: 'Not Rated',
      dateActive: 'in 16h',
    },
    {
      name: 'Scaleswap',
      category: 'Blockchain Service',
      goal: '$2,500,000',
      interest: 'Not Rated',
      dateActive: 'in 41h',
    },
    {
      name: 'Vent Finance',
      category: 'DeFi',
      goal: '$1,020,000',
      interest: 'Not Rated',
      dateActive: '22 Jul',
    },
    {
      name: 'DeRace',
      category: 'Blockchain Service',
      goal: '1,700,000',
      interest: 'Not Rated',
      dateActive: '26 Jul',
    },
  ],
  thirdColumn: [
    {
      name: 'CryptoArt.Ai',
      category: 'Marketplace',
      goal: '$1,120,000',
      interest: 'Not Rated',
      dateActive: '18 Jul',
    },
    {
      name: 'Glimpse',
      category: 'Marketplace',
      goal: '$1,300,000',
      interest: 'Not Rated',
      dateActive: '16 Jul',
    },
    {
      name: 'Omni',
      category: 'Dapp',
      goal: '$200,000',
      interest: 'Not Rated',
      dateActive: '16 Jul',
    },
    {
      name: 'YOLOrekt',
      category: 'Blockchain Service',
      goal: '$320,000',
      interest: 'Not Rated',
      dateActive: '16 Jul',
    },
  ],
};

const useStyles = makeStyles({
  root: {
    borderBottom: '1px solid rgb(119, 118, 118)',
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: '0px',
    },
    '&:hover': {
      backgroundColor: '#fafafa',
      cursor: 'pointer',
    },
  },
  rootActive: {
    borderBottom: '1px solid rgb(119, 118, 118)',
    backgroundColor: '#84ab95',
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: '0px',
    },
  },
  content: {
    '&:last-child': { paddingBottom: '16px' },
  },
});

const Home = () => {
  const classes = useStyles();
  const [active, setActive] = useState(null);

  const setClass = (event) => {
    if (event.target.id !== active) {
      setActive(event.target.id);
    }
    if (event.target.id === 'container') {
      setActive(null);
    }
  };

  const returnColumns = (item) => {
    return (
      <>
        <Card
          className={active === item.name ? classes.rootActive : classes.root}
          id={item.name}
          onClick={setClass}>
          <CardContent id={item.name} className={classes.content}>
            <div id={item.name}>{item.name}</div>
            <div id={item.name}>{item.category}</div>
            <div id={item.name}>{item.goal}</div>
            <div id={item.name} className={s.info}>
              <div id={item.name}>{item.interest}</div>
              <div id={item.name}>{item.dateActive}</div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className={s.wrapper} id="container" onClick={setClass}>
      <div className={s.container}>
        <div className={s.column_container}>
          <div className={s.title}>Active</div>

          <div className={s.content}>{data.firstColumn.map((item) => returnColumns(item))}</div>
        </div>
        <div className={s.column_container}>
          <div className={s.title}>Upcoming</div>
          <div className={s.content}>{data.secondColumn.map((item) => returnColumns(item))}</div>
        </div>
        <div className={s.column_container}>
          <div className={s.title}>Ended</div>
          <div className={s.content}>{data.thirdColumn.map((item) => returnColumns(item))}</div>
        </div>
      </div>
      <div className={s.footer_container}>
        <div className={s.footer_content}>
          <div className={s.footer_title}>Name Company</div>
          <div>
            ICO Drops is an independent ICO (Token Sale) database and is not affiliated with any ICO
            project or company. Our Interest Level does not constitute financial or investment
            advice.
          </div>
          <div>© 2021 ICO Drops.</div>
        </div>
        <div className={s.footer_content}>
          <a href="#">Active ICO</a>
          <a href="#">Upcoming ICO</a>
          <a href="#">Ended ICO</a>
          <a href="#">Bounty List</a>
          <a href="#">SandBox </a>
        </div>
        <div className={s.footer_content}>
          <a href="#">Dropstab</a>
          <a href="#">Dropsearn</a>
          <a href="#">Portfolio</a>
          <a href="#">Ico calendar</a>
        </div>
        <div className={s.footer_content}>
          <a href="#">Email</a>
          <a href="#">Twitter</a>
          <a href="#">Telegram</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
