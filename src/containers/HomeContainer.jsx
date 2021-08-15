import { connect } from 'react-redux';
import Home from '../components/Home/index';

const mapStateToProps = (store) => ({
  user: store.user,
});

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
