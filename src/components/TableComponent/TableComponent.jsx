import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { SET_TABLE_DATA } from '../../constants';
import { setTableData } from '../../actions/TableData';
import { StyledTableCell, StyledTableRow, useStyles } from '../../assets/MaterialStyles';
import s from './TableComponent.module.scss';

const TableComponent = ({ dispatch, tableData }) => {
  const classes = useStyles();

  useEffect(() => {
    dispatch(setTableData({ type: SET_TABLE_DATA }));
  }, []);

  const checkBoxHandler = (event) => {
    const target = event.target;
    const name = target.name;
    if (target.checked) {
      localStorage.setItem(name, target.value);
    } else {
      localStorage.removeItem(name);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Cryptocurrency</div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Slug</StyledTableCell>
              <StyledTableCell align="center">Symbol</StyledTableCell>
              <StyledTableCell align="center">Price (USD)</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Object.keys(tableData).map((row) => (
              <StyledTableRow key={row}>
                <StyledTableCell align="center">
                  <div className={s.table_cell}>
                    <div className={s.star_checkbox}>
                      <label>
                        <input
                          type="checkbox"
                          defaultChecked={localStorage.getItem(tableData[row].id)}
                          value={JSON.stringify(tableData[row])}
                          name={tableData[row].id}
                          onChange={checkBoxHandler}
                        />
                      </label>
                    </div>
                    <div className={s.table_id}> {tableData[row].id}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">{tableData[row].slug}</StyledTableCell>
                <StyledTableCell align="center">{tableData[row].symbol}</StyledTableCell>
                <StyledTableCell align="center">
                  {tableData[row].metrics.market_data.price_usd}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
