import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import db from '../../db';

const moment = extendMoment(Moment);

import s from './Home.module.scss';

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
    lineHeight: 1.35,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '350px',
    minHeight: '200px',
    justifyContent: 'space-between',
  },
});

const Home = (props) => {
  const classes = useStyles();
  const [active, setActive] = useState(null);
  const [data, setData] = useState([...db.cryptocurrency]);
  const [dialog, setDialog] = useState({
    open: false,
    role: '',
    name: '',
  });
  const [dialogValues, setDialogValues] = useState(null);

  const { isLoggedIn } = props.user;
  const setClass = (event) => {
    if (event.target.id !== active) {
      setActive(event.target.id);
    }
    if (event.target.id === 'container') {
      setActive(null);
    }
  };

  const addItemHandle = () => {
    setDialog({ open: true, role: 'add', name: '' });
    setDialogValues(null);
  };

  const editItemHandle = (name) => {
    setDialog({ open: true, role: 'edit', name: name });
    const items = data.find((item) => item.name === name);
    setDialogValues({ ...items });
  };

  const deleteItemHandle = (name) => {
    data.forEach((item) => {
      if (item.name === name) {
        const items = [...data];
        const index = items.indexOf(item);
        items.splice(index, 1);
        setData([...items]);
      }
    });
  };

  const handleDialogValueChange = (event) => {
    const { name, value } = event.target;
    setDialogValues({ ...dialogValues, [name]: value });
  };

  const dialogHandle = () => {
    if (dialog.role !== 'add') {
      setDialog({ open: false });
      data.forEach((item) => {
        if (item.name === dialog.name) {
          const itemsData = [...data];
          const index = itemsData.indexOf(item);
          itemsData[index] = { ...dialogValues };
          setData([...itemsData]);
        }
      });
    } else {
      const items = [...data];
      const date = new Date();
      setData([...items, dialogValues, { date: date }]);
    }
  };

  console.log(data);

  const dialogForm = () => {
    return (
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ open: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Change fields for {dialog.role}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Name"
            name="name"
            id="outlined-size-small"
            value={dialogValues && dialogValues.name}
            variant="outlined"
            size="small"
            onChange={handleDialogValueChange}
          />
          <TextField
            label="Category"
            name="category"
            id="outlined-size-small"
            value={dialogValues && dialogValues.category}
            variant="outlined"
            size="small"
            onChange={handleDialogValueChange}
          />
          <TextField
            label="Goal"
            name="goal"
            id="outlined-size-small"
            value={dialogValues && dialogValues.goal}
            variant="outlined"
            size="small"
            onChange={handleDialogValueChange}
          />
          <TextField
            label="Interest"
            name="interest"
            id="outlined-size-small"
            value={dialogValues && dialogValues.interest}
            variant="outlined"
            size="small"
            onChange={handleDialogValueChange}
          />
        </DialogContent>
        <div className={s.dialog_buttons}>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={() => setDialog({ open: false })}>
            Close
          </Button>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={dialogHandle}>
            Accept
          </Button>
        </div>
      </Dialog>
    );
  };

  const returnColumns = (item) => {
    return (
      <>
        <Card
          className={active === item.name ? classes.rootActive : classes.root}
          id={item.name}
          onClick={setClass}>
          <CardContent id={item.name} className={classes.content}>
            <div className={s.item_name_container}>
              <div className={s.item_name} id={item.name}>
                {item.name}
              </div>
              {!isLoggedIn && (
                <div>
                  <IconButton size="small" onClick={() => editItemHandle(item.name)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteItemHandle(item.name)}>
                    <HighlightOffIcon />
                  </IconButton>
                </div>
              )}
            </div>

            <div id={item.name}>{item.category}</div>
            <div id={item.name}>{item.goal}</div>
            <div id={item.name} className={s.info}>
              <div id={item.name}>{item.interest}</div>
              <div className={s.date_active} id={item.name}>
                {item.dateActive}
              </div>
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
        {dialogForm()}
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
        <div className={s.add_button}>
          Add new column
          <IconButton color="primary" size="medium" onClick={addItemHandle}>
            <AddBoxIcon fontSize="large" />
          </IconButton>
        </div>
        <div className={s.footer_container}>
          <div className={s.footer_row}>
            <div className={s.footer_content}>
              <div className={s.footer_title}>Name Company</div>
              <div className={s.footer_description}>
                ICO Drops is an independent ICO (Token Sale) database and is not affiliated with any
                ICO project or company. Our Interest Level does not constitute financial or
                investment advice.
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
    </div>
  );
};

export default Home;
