import React, { useState, useEffect } from 'react';
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
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/index';
import { getHomeData, setHomeData } from '../../actions/Home';
import { getUser } from '../../actions/User';
import db from '../../db';

import s from './Home.module.scss';

const moment = extendMoment(Moment);

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid rgb(119, 118, 118)',
    marginBottom: '10px',
    fontFamily: 'roboto, sans-serif',
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
    minHeight: '300px',
    justifyContent: 'space-between',
    [theme.breakpoints.down(575.98)]: {
      minWidth: '0',
    },
  },
  deleteIcon: {
    color: 'red',
  },
  editIcon: {
    color: 'green',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const data = props.homeData;
  const { isLoggedIn } = props.user;
  const [error, setError] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    role: '',
    name: '',
  });
  const [dialogValues, setDialogValues] = useState(null);

  useEffect(() => {
    props.dispatch(getHomeData(db.cryptocurrency));
    props.dispatch(getUser());
  }, []);

  const infoHandle = (event) => {
    if (
      event.target.localName !== 'svg' &&
      event.target.localName !== 'path' &&
      event.target.localName !== 'button'
    ) {
      const info = event.currentTarget.id;
      history.push(`/info/${info}`);
    }
  };

  const addItemHandle = () => {
    const date = moment(new Date()).format('YYYY-MM-DDTHH:mm');
    setDialog({ open: true, role: 'add', name: '' });
    setDialogValues({ ...dialogValues, date });
  };

  const editItemHandle = (name) => {
    setDialog({ open: true, role: 'edit', name });
    const items = data.find((item) => item.name === name);
    setDialogValues({ ...items });
  };

  const deleteItemHandle = (name) => {
    const filteredItems = data.filter((item) => item.name !== name);
    props.dispatch(setHomeData(filteredItems));
  };

  const handleDialogValueChange = (event) => {
    const { name, value } = event.target;
    setDialogValues({ ...dialogValues, [name]: value });
  };

  const dialogHandle = () => {
    if (dialogValues.name) {
      setError(false);
      if (dialog.role === 'edit') {
        setDialog({ open: false });
        data.forEach((item) => {
          if (item.name === dialog.name) {
            const itemsData = [...data];
            const index = itemsData.indexOf(item);
            itemsData[index] = { ...dialogValues };
            props.dispatch(setHomeData([...itemsData]));
          }
        });
      }
      if (dialog.role === 'add') {
        props.dispatch(setHomeData([...data, dialogValues]));
      }
      handleDialogClose();
    } else {
      setError(true);
    }
  };

  const handleDialogClose = () => {
    setDialog({ open: false });
    setDialogValues(null);
  };

  const dialogForm = () => {
    return (
      <Dialog
        open={dialog.open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogRoot}>
        <DialogTitle id="alert-dialog-title">Change fields for {dialog.role}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Name"
            name="name"
            id="outlined-size-small"
            value={(dialogValues && dialogValues.name) || ''}
            variant="outlined"
            size="small"
            onChange={handleDialogValueChange}
            error={error}
            helperText={error && 'Write please name'}
          />
          <TextField
            label="Category"
            name="category"
            id="outlined-size-small"
            value={(dialogValues && dialogValues.category) || ''}
            variant="outlined"
            size="small"
            onChange={handleDialogValueChange}
          />
          <TextField
            label="Goal"
            name="goal"
            id="outlined-size-small"
            value={(dialogValues && dialogValues.goal) || ''}
            variant="outlined"
            size="small"
            onChange={handleDialogValueChange}
          />
          <TextField
            label="Interest"
            name="interest"
            id="outlined-size-small"
            value={(dialogValues && dialogValues.interest) || ''}
            variant="outlined"
            size="small"
            onChange={handleDialogValueChange}
          />
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            variant="outlined"
            size="small"
            name="date"
            value={(dialogValues && dialogValues.date) || ''}
            onChange={handleDialogValueChange}
          />
        </DialogContent>
        <div className={s.dialog_buttons}>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleDialogClose}>
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
      <React.Fragment key={item.name}>
        <Card id={item.name} className={classes.root} onClick={infoHandle}>
          <CardContent className={classes.content}>
            <div className={s.item_name_container}>
              <div className={s.item_name}>{item.name}</div>
              {isLoggedIn && props.user.role === 'admin' && (
                <div>
                  <IconButton
                    className={classes.editIcon}
                    size="small"
                    id="icon"
                    onClick={() => editItemHandle(item.name)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className={classes.deleteIcon}
                    size="small"
                    id="icon"
                    onClick={() => deleteItemHandle(item.name)}>
                    <HighlightOffIcon />
                  </IconButton>
                </div>
              )}
            </div>
            <div>{item.category}</div>
            <div>{item.goal}</div>
            <div className={s.info}>
              <div>{item.interest}</div>
              <div className={s.date_active}>{item.dateActive}</div>
            </div>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  };

  const filteredColumns = ['Active', 'Upcoming', 'Ended'];

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {dialogForm()}
        <div className={s.content}>
          {filteredColumns.map((item) => {
            if (item === 'Active') {
              return (
                <React.Fragment key={item}>
                  <div className={s.column_container}>
                    <div className={s.title}>{item}</div>
                    <div className={s.column_content}>
                      {data.filter((key) => key.column === item).map((item) => returnColumns(item))}
                    </div>
                  </div>
                </React.Fragment>
              );
            }
            if (item === 'Upcoming') {
              return (
                <React.Fragment key={item}>
                  <div className={s.column_container}>
                    <div className={s.title}>{item}</div>
                    <div className={s.column_content}>
                      {data.filter((key) => key.column === item).map((item) => returnColumns(item))}
                    </div>
                  </div>
                </React.Fragment>
              );
            }
            if (item === 'Ended') {
              return (
                <React.Fragment key={item}>
                  <div className={s.column_container}>
                    <div className={s.title}>{item}</div>
                    <div className={s.column_content}>
                      {data.filter((key) => key.column === item).map((item) => returnColumns(item))}
                    </div>
                  </div>
                </React.Fragment>
              );
            }
          })}
        </div>
        {isLoggedIn && props.user.role === 'admin' && (
          <div className={s.add_button}>
            Add new column
            <IconButton color="primary" size="medium" onClick={addItemHandle}>
              <AddBoxIcon fontSize="large" />
            </IconButton>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
