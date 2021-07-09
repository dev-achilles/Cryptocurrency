import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles } from '../../assets/MaterialStyles';
import s from './FavouriteComponent.module.scss';

const FavouriteComponent = () => {
  const classes = useStyles();

  let tableData = [];

  for (let i = 0; i < localStorage.length; i++) {
    const list = JSON.parse(localStorage.getItem(localStorage.key(i)));
    tableData.push(list);
  }

  return (
    <div className="table-wrapper">
      <div className="table-title">Favourite Table</div>
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
                <StyledTableCell align="center">{tableData[row].id}</StyledTableCell>
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

export default FavouriteComponent;
