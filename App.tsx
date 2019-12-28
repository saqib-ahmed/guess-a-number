import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'

const fetchFonts = () => {
    return Font.loadAsync({'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'), 'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf')})
}

export default function App() {
    const [userNumber,
        setUserNumber] = useState()
    const [guessRounds,
        setGuessRounds] = useState(0)
    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber)
        setGuessRounds(0)
    }

    const [dataLoaded,
        setDataLoaded] = useState(false)

    if (!dataLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={err => console.log(err)}/>
    }

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds)
    }

    const restartHandler = () => {
      setGuessRounds(0)
      setUserNumber(null)
    }

    let content = <StartGameScreen onStartGame={startGameHandler}/>

    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    } else if (guessRounds > 0) {
        content = <GameOver rounds={guessRounds} number={userNumber} onRestart={restartHandler}/>
    }
    return (
        <View style={styles.screen}>
            <Header title="Guess a number"/> 
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
