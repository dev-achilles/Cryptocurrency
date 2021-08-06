import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import s from './Home.module.scss';

const data = [
  {
    name: 'MyCryptoCheckout',
    category: 'Payments',
    goal: '$240,000',
    interest: 'Sponsored',
    dateActive: '3d left',
    column: 'none',
    date: '2021-07-26T23:35:00',
  },
  {
    name: 'Coin98 Labs',
    category: 'Platform',
    goal: '$3,750,000',
    interest: 'Not Rated',
    dateActive: '4d left',
    column: 'none',
    date: '2021-07-29T13:35:00',
  },
  {
    name: 'Hi',
    category: 'Blockchain Service',
    goal: 'NOT SET',
    interest: 'Not Rated',
    dateActive: 'TBA',
    column: 'none',
    date: '2021-07-27T13:35:00',
  },
  {
    name: 'Altair',
    category: 'Blockchain Service',
    goal: 'NOT SET',
    interest: 'Not Rated',
    dateActive: 'TBA',
    column: 'none',
    date: '2021-07-20T13:35:00',
  },
  {
    name: 'PolkaCipher',
    category: 'Blockchain Service',
    goal: '$2,020,000',
    interest: 'Not Rated',
    dateActive: 'in 16h',
    column: 'none',
    date: '2021-07-26T08:35:00',
  },
  {
    name: 'Scaleswap',
    category: 'Blockchain Service',
    goal: '$2,500,000',
    interest: 'Not Rated',
    dateActive: 'in 41h',
    column: 'none',
    date: '2021-07-30T13:35:00',
  },
  {
    name: 'Vent Finance',
    category: 'DeFi',
    goal: '$1,020,000',
    interest: 'Not Rated',
    dateActive: '22 Jul',
    column: 'none',
    date: '2021-07-19T13:35:00',
  },
  {
    name: 'DeRace',
    category: 'Blockchain Service',
    goal: '1,700,000',
    interest: 'Not Rated',
    dateActive: '26 Jul',
    column: 'none',
    date: '2021-06-19T17:35:00',
  },
  {
    name: 'CryptoArt.Ai',
    category: 'Marketplace',
    goal: '$1,120,000',
    interest: 'Not Rated',
    dateActive: '18 Jul',
    column: 'none',
    date: '2021-07-26T15:35:00',
  },
  {
    name: 'Glimpse',
    category: 'Marketplace',
    goal: '$1,300,000',
    interest: 'Not Rated',
    dateActive: '16 Jul',
    column: 'none',
    date: '2021-07-26T11:35:00',
  },
  {
    name: 'Omni',
    category: 'Dapp',
    goal: '$200,000',
    interest: 'Not Rated',
    dateActive: '16 Jul',
    column: 'none',
    date: '2021-08-28T22:35:00',
  },
  {
    name: 'YOLOrekt',
    category: 'Blockchain Service',
    goal: '$320,000',
    interest: 'Not Rated',
    dateActive: '16 Jul',
    column: 'none',
    date: '2021-07-26T13:35:00',
  },
];

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
    if (event.currentTarget.id !== active) {
      setActive(event.currentTarget.id);
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
            <div>{item.name}</div>
            <div>{item.category}</div>
            <div>{item.goal}</div>
            <div className={s.info}>
              <div>{item.interest}</div>
              <div>{item.dateActive}</div>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  const setCategoryColumn = (start, end, Data) => {
    const current = Data.date;
    const nowDate = moment(new Date());
    const result = moment(current).isBetween(start, end, 'minutes');
    if (result) {
      Data.column = 'Active';
      const duration = moment.duration(nowDate.diff(current));
      const hours = duration.asHours();
      if (hours < 1) {
        Data.dateActive = '< 1h left';
      } else {
        Data.dateActive = `${Math.floor(hours)}h left`;
      }
    } else {
      if (moment(current).isSameOrAfter(end)) {
        Data.column = 'Upcoming';
        const duration = moment.duration(moment(current).diff(nowDate));
        const hours = duration.asHours();
        if (hours < 25) {
          Data.dateActive = `in ${Math.floor(hours)}h`;
        } else {
          Data.dateActive = `in ${moment(current).format('MMM Do')}`;
        }
      }
      if (moment(current).isSameOrBefore(start)) {
        Data.column = 'Ended';
        const duration = moment.duration(nowDate.diff(current));
        const hours = duration.asHours();
        if (hours < 25) {
          Data.dateActive = `Ended: ${Math.floor(hours)}h left`;
        } else {
          Data.dateActive = `Ended: ${moment(current).format('MMM Do')}`;
        }
      }
    }
  };

  const start = '2021-07-26T09:00:00';
  const end = '2021-07-26T22:00:00';

  data.forEach((item) => setCategoryColumn(start, end, item));

  let filteredColumns = data.map((item) => item.column);
  filteredColumns = Array.from(new Set(filteredColumns.reverse()));

  return (
    <div className={s.wrapper} id="container" onClick={setClass}>
      <div className={s.container}>
        <div className={s.content}>
          {filteredColumns.map((item) => {
            let columnName = '';
            if (item === 'Active') {
              columnName = 'Active';
              return (
                <>
                  <div className={s.column_container}>
                    <div className={s.title}>{columnName}</div>
                    <div className={s.column_content}>
                      {data
                        .filter((key) => key.column === columnName)
                        .map((item) => returnColumns(item))}
                    </div>
                  </div>
                </>
              );
            }
            if (item === 'Upcoming') {
              columnName = 'Upcoming';
              return (
                <>
                  <div className={s.column_container}>
                    <div className={s.title}>{columnName}</div>
                    <div className={s.column_content}>
                      {data
                        .filter((key) => key.column === columnName)
                        .map((item) => returnColumns(item))}
                    </div>
                  </div>
                </>
              );
            }
            if (item === 'Ended') {
              columnName = 'Ended';
              return (
                <>
                  <div className={s.column_container}>
                    <div className={s.title}>{columnName}</div>
                    <div className={s.column_content}>
                      {data
                        .filter((key) => key.column === columnName)
                        .map((item) => returnColumns(item))}
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
      <div className={s.footer_container}>
        <div className={s.footer_row}>
          <div className={s.footer_content}>
            <div className={s.footer_title}>Name Company</div>
            <div className={s.footer_description}>
              ICO Drops is an independent ICO (Token Sale) database and is not affiliated with any
              ICO project or company. Our Interest Level does not constitute financial or investment
              advice.
            </div>
            <div className={s.footer_copyright}>© 2021 ICO Drops.</div>
          </div>
          <div className={s.footer_columnInfo}>
            <a href="#">Active ICO</a>
            <a href="#">Upcoming ICO</a>
            <a href="#">Ended ICO</a>
            <a href="#">Bounty List</a>
            <a href="#">SandBox </a>
          </div>
          <div className={s.footer_companyInfo}>
            <a href="#">Dropstab</a>
            <a href="#">Dropsearn</a>
            <a href="#">Portfolio</a>
            <a href="#">Ico calendar</a>
          </div>
          <div className={s.footer_mediaLink}>
            <a href="#">Email</a>
            <a href="#">Twitter</a>
            <a href="#">Telegram</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
