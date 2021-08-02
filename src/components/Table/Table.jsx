import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { SET_TABLE_DATA } from '../../constants';
import { setTableData } from '../../actions/TableData';
import { StyledTableCell, StyledTableRow, useStyles } from '../../assets/MaterialStyles';
import s from './Table.module.scss';

const TableOfCurrency = (props) => {
  const classes = useStyles();
  let tableData = [];
  if (props.favourite) {
    tableData = JSON.parse(localStorage.getItem('favourites'));
  } else {
    tableData = props.tableData;
  }

  const [open, setOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [check, setCheck] = useState({
    fields: [
      { name: 'ID', value: 'id', isChecked: true },
      { name: 'Slug', value: 'slug', isChecked: true },
      { name: 'Symbol', value: 'symbol', isChecked: true },
      { name: 'Price (USD)', value: 'metrics', isChecked: true },
    ],
  });

  useEffect(() => {
    props.dispatch(setTableData({ type: SET_TABLE_DATA }));
  }, []);

  if (sortConfig.type === 'string') {
    tableData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  if (sortConfig.type === 'number') {
    tableData.sort((a, b) => {
      if (sortConfig.direction === 'descending') {
        return b[sortConfig.key].market_data.price_usd - a[sortConfig.key].market_data.price_usd;
      }
      if (sortConfig.direction === 'ascending') {
        return a[sortConfig.key].market_data.price_usd - b[sortConfig.key].market_data.price_usd;
      }
    });
  }

  const handleSort = (event) => {
    switch (event.target.innerText) {
      case 'ID':
        return requestSort({ key: 'id', type: 'string' });
      case 'Slug':
        return requestSort({ key: 'slug', type: 'string' });
      case 'Symbol':
        return requestSort({ key: 'symbol', type: 'string' });
      case 'Price (USD)':
        return requestSort({ key: 'metrics', type: 'number' });
    }
  };

  const requestSort = (data) => {
    let direction = 'ascending';
    if (sortConfig.key === data.key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ ...data, direction });
  };

  const setActiveIcon = (name) => {
    switch (name) {
      case 'ID':
        return 'id';
      case 'Slug':
        return 'slug';
      case 'Symbol':
        return 'symbol';
      case 'Price (USD)':
        return 'metrics';
    }
  };

  const checkBoxHandler = (event) => {
    const target = event.target;
    const name = target.name;
    const favourites = JSON.parse(localStorage.getItem('favourites'));

    if (target.checked) {
      const data = favourites || [];
      if (data.length === 0 || favourites) {
        data.push(JSON.parse(event.target.value));
      }
      localStorage.setItem('favourites', JSON.stringify(data));
    } else {
      const data = favourites;
      const foundFavourite = data.find((item) => item.id === name);
      if (foundFavourite) {
        data.splice(data.indexOf(foundFavourite), 1);
        localStorage.setItem('favourites', JSON.stringify(data));
      }
    }
  };

  const defaultChecked = (id) => {
    const data = JSON.parse(localStorage.getItem('favourites'));
    if (data) {
      return data.find((item) => item.id === id);
    } else {
      return false;
    }
  };

  const handleCheckChieldElement = (event) => {
    const fields = check.fields;
    fields.forEach((fields) => {
      if (fields.value === event.target.value) fields.isChecked = event.target.checked;
    });
    setCheck({ fields });
  };

  const setTableCells = () => {
    const cells = check.fields;
    return cells
      .filter((item) => item.isChecked)
      .map((item) => (
        <StyledTableCell key={item.id} align="center" onClick={handleSort}>
          <div className={s.table_cell}>
            {item.name}
            {setActiveIcon(item.name) === sortConfig.key ? (
              sortConfig.direction === 'ascending' ? (
                <ArrowUpwardIcon color="primary" />
              ) : (
                <ArrowDownwardIcon color="primary" />
              )
            ) : null}
          </div>
        </StyledTableCell>
      ));
  };

  const actualCells = () => {
    let fields = check.fields;
    const data = JSON.parse(JSON.stringify(tableData));
    if (data) {
      fields = fields.filter((item) => !item.isChecked).map((item) => item.value);
      Object.keys(data).forEach((elem) => {
        for (let key of Object.keys(data[elem])) {
          fields.includes(key) && delete data[elem][key];
        }
      });
    } else {
      return null;
    }

    return (
      <>
        {Object.keys(data).map((row) => (
          <StyledTableRow key={row}>
            {data[row].id && (
              <StyledTableCell align="center">
                <div className={s.table_cell}>
                  <div className={s.star_checkbox}>
                    <label>
                      <input
                        type="checkbox"
                        defaultChecked={defaultChecked(data[row].id)}
                        value={JSON.stringify(data[row])}
                        name={data[row].id}
                        onChange={checkBoxHandler}
                      />
                    </label>
                  </div>
                  <div className={s.table_id}>{data[row].id}</div>
                </div>
              </StyledTableCell>
            )}
            {data[row].slug && <StyledTableCell align="center">{data[row].slug}</StyledTableCell>}
            {data[row].symbol && (
              <StyledTableCell align="center">{data[row].symbol}</StyledTableCell>
            )}
            {data[row].metrics && (
              <StyledTableCell align="center">
                {data[row].metrics.market_data.price_usd}
              </StyledTableCell>
            )}
          </StyledTableRow>
        ))}
      </>
    );
  };

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{props.favourite ? 'Favourite' : 'Cryptocurrency'}</div>

      <TableContainer component={Paper}>
        {tableData && (
          <div className={s.filter_wrapper}>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}>
              Open Filter
            </Button>
          </div>
        )}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          max-width="lg">
          <DialogTitle>Please Select Columns</DialogTitle>
          {check.fields.map((item) => {
            return (
              <div key={item.id}>
                <Checkbox
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  onChange={handleCheckChieldElement}
                  value={item.value}
                  checked={item.isChecked}
                />
                {item.name}
              </div>
            );
          })}
          <div className={s.dialog_button}>
            <Button onClick={() => setOpen(false)} variant="contained" color="primary">
              Close
            </Button>
          </div>
        </Dialog>
        {tableData ? (
          tableData.length !== 0 ? (
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <StyledTableRow>{setTableCells()}</StyledTableRow>
              </TableHead>
              <TableBody>{actualCells()}</TableBody>
            </Table>
          ) : props.favourite ? (
            <div className={s.data_not_exist}>No Favourite Columns</div>
          ) : (
            <div className={s.data_not_exist}>No Data For Columns</div>
          )
        ) : props.favourite ? (
          <div className={s.data_not_exist}>No Favourite Columns</div>
        ) : (
          <div className={s.data_not_exist}>No Data For Columns</div>
        )}
      </TableContainer>
    </div>
  );
};

export default TableOfCurrency;
