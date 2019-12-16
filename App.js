import MemberComponent from './components/member.component';
import BrushingHstoryComponent from './components/brushing-history.component';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: MemberComponent},
  Entry: {screen: BrushingHstoryComponent},
});

const App = createAppContainer(MainNavigator);

export default App;
