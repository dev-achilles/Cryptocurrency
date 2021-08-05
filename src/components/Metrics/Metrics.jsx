import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { getMetricsData } from '../../actions/TableData';
import { StyledTableCell, StyledTableRow, useStyles } from '../../assets/MaterialStyles';
import s from './Metrics.module.scss';

const Metrics = (props) => {
  const classes = useStyles();
  const { slug } = useParams();

  useEffect(() => {
    props.dispatch(getMetricsData(slug.substr(1)));
  }, []);

  console.log(props.metricsData.name);

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{props.metricsData.name}</div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Property</StyledTableCell>
              <StyledTableCell align="center">Value</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.metricsData.length !== 0 && (
              <>
                <StyledTableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">{props.metricsData.name}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center">Symbol</StyledTableCell>
                  <StyledTableCell align="center">{props.metricsData.symbol}</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell styles="font-size: 20px" align="center">
                    Supply liquid
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {props.metricsData.supply.liquid ? props.metricsData.supply.liquid : 'none'}
                  </StyledTableCell>
                </StyledTableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Metrics;
