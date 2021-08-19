import { connect } from 'react-redux';
import Home from '../components/Home/index';

const mapStateToProps = (store) => ({
  user: store.user,
  homeData: store.home.homeData,
});

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
