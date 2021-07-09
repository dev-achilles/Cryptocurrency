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
import { SET_TABLE_DATA } from '../../constants';
import { setTableData, sortTable } from '../../actions/TableData';
import { StyledTableCell, StyledTableRow, useStyles } from '../../assets/MaterialStyles';
import s from './TableComponent.module.scss';

const TableComponent = ({ dispatch, tableData }) => {
  const classes = useStyles();

  useEffect(() => {
    dispatch(setTableData({ type: SET_TABLE_DATA }));
  }, []);

  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState({
    fields: [
      { name: 'ID', value: 'id', isChecked: true },
      { name: 'Slug', value: 'slug', isChecked: true },
      { name: 'Symbol', value: 'symbol', isChecked: true },
      { name: 'Price (USD)', value: 'metrics', isChecked: true },
    ],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkBoxHandler = (event) => {
    const target = event.target;
    const name = target.name;
    if (target.checked) {
      localStorage.setItem(name, target.value);
    } else {
      localStorage.removeItem(name);
    }
  };

  const handleSort = (event) => {
    switch (event.target.innerText) {
      case 'ID':
        return dispatch(sortTable({ field: 'id', type: 'string' }));
      case 'Slug':
        return dispatch(sortTable({ field: 'slug', type: 'string' }));
      case 'Symbol':
        return dispatch(sortTable({ field: 'symbol', type: 'string' }));
      case 'Price (USD)':
        return dispatch(sortTable({ field: 'metrics', type: 'number' }));
    }
  };

  const handleCheckChieldElement = (event) => {
    const fields = check.fields;
    fields.forEach((fields) => {
      if (fields.value === event.target.value) fields.isChecked = event.target.checked;
    });
    setCheck({ fields: fields });
  };

  const setTableCells = () => {
    const cells = check.fields;
    return cells
      .filter((item) => item.isChecked === true)
      .map((item) => (
        <StyledTableCell align="center" onClick={handleSort}>
          <div className={s.table_cell}>{item.name}</div>
        </StyledTableCell>
      ));
  };

  const actualCells = () => {
    let fields = check.fields;
    const data = JSON.parse(JSON.stringify(tableData));
    fields = fields.filter((item) => item.isChecked === false).map((item) => item.value);
    Object.keys(data).forEach((elem) => {
      for (let key of Object.keys(data[elem])) {
        fields.includes(key) && delete data[elem][key];
      }
    });

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
                        defaultChecked={localStorage.getItem(data[row].id)}
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
      <div className={s.title}>Cryptocurrency</div>

      <TableContainer component={Paper}>
        <div className={s.filter_wrapper}>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClickOpen}>
            Open Filter
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          max-width="lg">
          <DialogTitle>Please Select Columns</DialogTitle>
          {check.fields.map((item) => {
            return (
              <div>
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
            <Button onClick={handleClose} variant="contained" color="primary">
              Close
            </Button>
          </div>
        </Dialog>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <StyledTableRow>{setTableCells()}</StyledTableRow>
          </TableHead>
          <TableBody>{actualCells()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
