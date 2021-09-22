import { connect } from 'react-redux';
import Metrics from '../components/Metrics/index';
import { RootState } from '../store';

const mapStateToProps = (store: RootState) => ({
  metricsData: store.table.metricsData,
});

const MetricsContainer = connect(mapStateToProps)(Metrics);

export default MetricsContainer;
