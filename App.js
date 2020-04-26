import React, {PureComponent} from 'react';
import {StatusBar, Text, StyleSheet, View, Alert} from 'react-native';
import Entities from './entities';
import {GameEngine} from 'react-native-game-engine';
import Systems from './systems';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      running: true,
    };
    this.gameEngine = null;
    console.disableYellowBox = true;
  }

  onEvent = e => 
  {
    if (e.type === 'gameOver') {
      this.setState({running: false});
      this.gameEngine.swap(Entities());
      this.setState({running: true});
    } 
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={ref => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          onEvent={this.onEvent}
          entities={Entities()}
          systems={Systems}
          running={this.state.running}>
          <StatusBar hidden={true} />
        </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});