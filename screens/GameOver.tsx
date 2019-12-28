import React from 'react'

import {Text, StyleSheet, View, Button, Image} from 'react-native'
import Card from '../components/Cards'
import BodyText from '../components/Bodytext'
import Titletext from '../components/TitleText'
import MainButton from '../components/MainButton'

const GameOver = props => {
    return (
        <View style={styles.screen}>
            <Titletext>
                Game Over!
            </Titletext>
            <Image style={styles.image} // source={require('../assets/success.png')}} 
            source={{
                uri: 'https://www.adventureconsultants.com/assets/Uploads/Himalaya/Nepal-Himalaya/Everest/Descending-towards-Soth-Col-Rob-Smith.jpeg'
            }} resizeMode='contain'/>
            <BodyText>
                Number of rounds
            </BodyText>
            <Card>
                <Text>{props.rounds}</Text>
            </Card>
            <BodyText>
                User selected Number
            </BodyText>
            <Card>
                <Text>{props.number}</Text>
            </Card >
            <MainButton onPress={props.onRestart}>
                Restart Game
            </MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '80%',
        height: 300
    }
})

export default GameOver