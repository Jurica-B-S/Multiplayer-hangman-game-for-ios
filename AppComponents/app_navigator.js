import { createStackNavigator , createAppContainer} from 'react-navigation';
import LandingPage from '../views/landing_page';
import InsertPage from '../views/insert_page';
import GameTypePage from '../views/game_type_page';
import SinglePlayerPage from '../views/single_player_page';
import MultiPlayerPage from '../views/multi_player_rooms_page';
import MultiPlayerGame from '../views/multi_player_game';


const AppNavigator = createStackNavigator({
  LandingPage: { screen: LandingPage, navigationOptions: () => ({
      header: null
    }) },
  InsertPage: {screen: InsertPage, navigationOptions: () => ({
      header: null
    })},
  GameTypePage: {screen: GameTypePage, navigationOptions: () => ({
      header: null
    })},
  SinglePlayerPage: {screen: SinglePlayerPage, navigationOptions: () => ({
      header: null
    })},
  MultiPlayerPage: {screen: MultiPlayerPage, navigationOptions: () => ({
      header: null,
      headerLeft:null,
      gesturesEnabled: false,
    })},
    MultiPlayerGame: {screen: MultiPlayerGame, navigationOptions: () => ({
        header: null,
        headerLeft:null,
        gesturesEnabled: false,
      })},
});

export default createAppContainer(AppNavigator);
