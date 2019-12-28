import React, {useState, useRef, useEffect} from 'react'

import {
    Text,
    View,
    StyleSheet,
    Button,
    Alert,
    ScrollView
} from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Cards';
import {Ionicons} from '@expo/vector-icons'
import MainButton from '../components/MainButton';
import BodyText from '../components/Bodytext';
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const renderListItem = (value, numOfRounds) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{numOfRounds}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    )
}
const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess,
        setCurrentGuess] = useState(initialGuess)
    const [pastGuesses,
        setPastGuesses] = useState([initialGuess])

    const [rounds,
        setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const {userChoice, onGameOver} = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver])
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong', [
                {
                    text: 'sorry',
                    style: 'cancel'
                }
            ])
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess

        } else {
            currentLow.current = currentGuess + 1
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(currentRounds => currentRounds = 1)

        setPastGuesses(curPastGuess => [
            nextNumber, ...curPastGuess
        ])
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                    <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    list: {
        flex: 1,
        width: '80%'
    },
    listItem: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default GameScreen