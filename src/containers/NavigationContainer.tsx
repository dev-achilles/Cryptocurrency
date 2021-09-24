import { connect } from 'react-redux';
import Navigation from '../components/Navigation/index';
import { RootState } from '../store';

const mapStateToProps = (store: RootState) => ({
  user: store.user,
});

const NavigationContainer = connect(mapStateToProps)(Navigation);

export default NavigationContainer;
