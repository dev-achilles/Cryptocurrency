import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TableActionCreator } from '../../actions/Table/index';
import { StyledTableCell, StyledTableRow, useStyles } from '../../assets/MaterialStyles';
import { SortConfigType, CheckArray, DataTypes, CheckTypes } from '../../types/TableTypes';
import notFoundIcon from '../../assets/images/favourite.svg';
import s from './Table.module.scss';

const TableOfCurrency: React.FC = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const { tableData } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    key: '',
    direction: '',
    type: '',
  });
  const [check, setCheck] = useState<CheckArray>({
    fields: [
      { name: 'ID', value: 'id', isChecked: true },
      { name: 'Slug', value: 'slug', isChecked: true },
      { name: 'Symbol', value: 'symbol', isChecked: true },
      { name: 'Price (USD)', value: 'metrics', isChecked: true },
    ],
  });

  useEffect(() => {
    props.dispatch(TableActionCreator.getTableData());
  }, []);

  if (tableData !== null) {
    if (sortConfig.type === 'string') {
      tableData.sort((a: any, b: any) => {
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
      tableData.sort((a: any, b: any) => {
        if (sortConfig.direction === 'descending') {
          return b[sortConfig.key].market_data.price_usd - a[sortConfig.key].market_data.price_usd;
        }
        if (sortConfig.direction === 'ascending') {
          return a[sortConfig.key].market_data.price_usd - b[sortConfig.key].market_data.price_usd;
        }
      });
    }
  }

  const handleSort = (event: any) => {
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

  const requestSort = (data: SortConfigType) => {
    let direction = 'ascending';
    if (sortConfig.key === data.key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ ...data, direction });
  };

  const setActiveIcon = (name: string) => {
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

  const checkBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const checked = target.checked;
    const storedData = localStorage.getItem('favourites');
    let favourites = null;
    if (typeof storedData === 'string') {
      favourites = JSON.parse(storedData);
    }

    props.dispatch(TableActionCreator.setCheckedData(name, checked));

    if (target.checked) {
      const data = favourites || [];
      if (data.length === 0 || favourites) {
        data.push(JSON.parse(event.target.value));
      }
      localStorage.setItem('favourites', JSON.stringify(data));
    } else {
      const data = favourites;
      const foundFavourite = data.find((item: DataTypes) => item.id === name);
      if (foundFavourite) {
        const filtered = data.filter((item: DataTypes) => item.id !== foundFavourite.id);
        localStorage.setItem('favourites', JSON.stringify(filtered));
      }
    }
  };

  const handleCheckChieldElement = (event: any) => {
    const fields = check.fields;
    fields.forEach((fields: CheckTypes) => {
      if (fields.value === event.target.value) fields.isChecked = event.target.checked;
    });
    setCheck({ fields });
  };

  const setTableCells = () => {
    const cells = check.fields;
    return cells
      .filter((item: CheckTypes) => item.isChecked)
      .map((item: CheckTypes, index: number) => (
        <StyledTableCell key={index} align="center" onClick={handleSort}>
          <div className={s.table_cell}>
            {item.name}
            {setActiveIcon(item.name) === sortConfig.key ? (
              sortConfig.direction === 'ascending' ? (
                <ArrowUpwardIcon style={{ color: 'white' }} />
              ) : (
                <ArrowDownwardIcon style={{ color: 'white' }} />
              )
            ) : null}
          </div>
        </StyledTableCell>
      ));
  };

  const metricsHandler = (event: any) => {
    if (!event.target.name) {
      const slug = event.currentTarget.id;
      history.push(`/metrics/${slug}`);
    }
  };

  const actualCells = () => {
    const selectColumns = (value: string) => {
      const field = check.fields.find((item: CheckTypes) => item.value === value);
      if (field !== undefined) return field.isChecked;
    };

    return (
      <>
        {props.favourite
          ? tableData
              .filter((item: DataTypes) => item.checked === true)
              .map((row: DataTypes, index: number) => (
                <StyledTableRow key={index} onClick={metricsHandler} id={row.slug}>
                  {row.id && selectColumns('id') ? (
                    <StyledTableCell align="center">
                      <div className={s.table_cell}>
                        <div className={s.star_checkbox}>
                          <label>
                            <input
                              type="checkbox"
                              checked={row.checked}
                              value={JSON.stringify(row)}
                              name={row.id}
                              onChange={checkBoxHandler}
                            />
                          </label>
                        </div>
                        <div className={s.table_id}>{row.id}</div>
                      </div>
                    </StyledTableCell>
                  ) : null}
                  {row.slug && selectColumns('slug') ? (
                    <StyledTableCell align="center">{row.slug}</StyledTableCell>
                  ) : null}
                  {row.symbol && selectColumns('symbol') ? (
                    <StyledTableCell align="center">{row.symbol}</StyledTableCell>
                  ) : null}
                  {row.metrics && selectColumns('metrics') ? (
                    <StyledTableCell align="center">
                      {row.metrics.market_data.price_usd}
                    </StyledTableCell>
                  ) : null}
                </StyledTableRow>
              ))
          : tableData.map((row: DataTypes, index: number) => (
              <StyledTableRow key={index} onClick={metricsHandler} id={row.slug}>
                {row.id && selectColumns('id') ? (
                  <StyledTableCell align="center">
                    <div className={s.table_cell}>
                      <div className={s.star_checkbox}>
                        <label>
                          <input
                            type="checkbox"
                            checked={row.checked}
                            value={JSON.stringify(row)}
                            name={row.id}
                            onChange={checkBoxHandler}
                          />
                        </label>
                      </div>
                      <div className={s.table_id}>{row.id}</div>
                    </div>
                  </StyledTableCell>
                ) : null}
                {row.slug && selectColumns('slug') ? (
                  <StyledTableCell align="center">{row.slug}</StyledTableCell>
                ) : null}
                {row.symbol && selectColumns('symbol') ? (
                  <StyledTableCell align="center">{row.symbol}</StyledTableCell>
                ) : null}
                {row.metrics && selectColumns('metrics') ? (
                  <StyledTableCell align="center">
                    {row.metrics.market_data.price_usd}
                  </StyledTableCell>
                ) : null}
              </StyledTableRow>
            ))}
      </>
    );
  };

  const redirectToTable = () => {
    history.push('/table');
  };

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{props.favourite ? 'Favourite' : 'Cryptocurrency'}</div>
      <div className="container">
        <TableContainer className={classes.container}>
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
            {check.fields.map((item: CheckTypes, index: number) => (
              <div key={index}>
                <Checkbox
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  onChange={handleCheckChieldElement}
                  value={item.value}
                  checked={item.isChecked}
                />
                {item.name}
              </div>
            ))}
            <div className={s.dialog_button}>
              <Button onClick={() => setOpen(false)} variant="contained" color="primary">
                Close
              </Button>
            </div>
          </Dialog>
          {tableData.length === 0 ? (
            <div className={s.data_not_exist}>
              <CircularProgress />
            </div>
          ) : props.favourite ? (
            tableData.filter((item: DataTypes) => item.checked).length !== 0 ? (
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <StyledTableRow>{setTableCells()}</StyledTableRow>
                </TableHead>
                <TableBody>{actualCells()}</TableBody>
              </Table>
            ) : (
              <div className={s.data_not_exist}>
                <div className={s.not_found_image}>
                  <img src={notFoundIcon}></img>
                </div>
                <div className={s.not_found_name}> No Favourite Columns</div>
                <div className={s.not_found_button}>
                  <Button variant="contained" color="primary" onClick={redirectToTable}>
                    Add
                  </Button>
                </div>
              </div>
            )
          ) : (
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <StyledTableRow>{setTableCells()}</StyledTableRow>
              </TableHead>
              <TableBody>{actualCells()}</TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
    </div>
  );
};

export default TableOfCurrency;
