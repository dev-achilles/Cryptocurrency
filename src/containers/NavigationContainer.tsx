import { connect } from 'react-redux';
import Navigation from '../components/Navigation/index';

const mapStateToProps = (store: any) => ({
  user: store.user,
});

const NavigationContainer = connect(mapStateToProps)(Navigation);

export default NavigationContainer;
