import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { TableActionCreator } from '../../actions/Table/index';
import { StyledTableCell, StyledTableRow, useStyles } from '../../assets/MaterialStyles';
import s from './Metrics.module.scss';

const Metrics = (props) => {
  const classes = useStyles();
  const { slug } = useParams();

  useEffect(() => {
    props.dispatch(TableActionCreator.getMetricsData(slug));
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.title}>{props.metricsData.name}</div>
      <div className="container">
        <TableContainer>
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
                      {props.metricsData.supply.liquid || 'none'}
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Metrics;
