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
import { getHomeData, setHomeData } from '../../actions/Home';
import { getUser } from '../../actions/User';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import db from '../../db';

import s from './Home.module.scss';

const moment = extendMoment(Moment);

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
    minHeight: '300px',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    color: 'red',
  },
  editIcon: {
    color: 'green',
  },
});

const Home = (props) => {
  const classes = useStyles();
  const data = props.homeData;
  const [active, setActive] = useState(null);
  const [error, setError] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    role: '',
    name: '',
  });
  const [dialogValues, setDialogValues] = useState(null);

  useEffect(() => {
    props.dispatch(getHomeData([...db.cryptocurrency]));
  }, []);

  useEffect(() => {
    props.dispatch(getUser());
  }, []);

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
    const date = moment(new Date()).format('YYYY-MM-DDTHH:mm');
    setDialog({ open: true, role: 'add', name: '' });
    setDialogValues({ ...dialogValues, ['date']: date });
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
        props.dispatch(setHomeData([...items]));
      }
    });
  };

  const handleDialogValueChange = (event) => {
    const { name, value } = event.target;
    setDialogValues({ ...dialogValues, [name]: value });
  };

  const dialogHandle = () => {
    if (dialogValues.name !== undefined && dialogValues.name !== '') {
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
        const items = [...data];
        props.dispatch(setHomeData([...items, dialogValues]));
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
            error={error}
            helperText={error && 'Write please name'}
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
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            variant="outlined"
            size="small"
            name="date"
            value={dialogValues && dialogValues.date}
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
              {isLoggedIn && props.user.role === 'admin' && (
                <div>
                  <IconButton
                    className={classes.editIcon}
                    size="small"
                    onClick={() => editItemHandle(item.name)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className={classes.deleteIcon}
                    size="small"
                    onClick={() => deleteItemHandle(item.name)}>
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

  const filteredColumns = ['Active', 'Upcoming', 'Ended'];

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
        {isLoggedIn && props.user.role === 'admin' && (
          <div className={s.add_button}>
            Add new column
            <IconButton color="primary" size="medium" onClick={addItemHandle}>
              <AddBoxIcon fontSize="large" />
            </IconButton>
          </div>
        )}
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
