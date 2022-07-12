import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from "../../utilities/Color";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Context from '../../Context/context';

const slides = [
    {
        key: 1,
        title: 'Découpez votre projet en tâches',
        text: 'Planifiez votre projet en le découpant en petites tâches de 25 minutes.',
        image: require('../../assets/images/onboard/project-tasks.png'),
    },
    {
        key: 2,
        title: 'Lancez un timer à chaque tâche',
        text: 'La minuterie vous permet de ne consacrer que 25 minutes à une tâche particulière.',
        image: require('../../assets/images/onboard/timer.png'),
    },
    {
        key: 3,
        title: 'Restez concentré sur votre projet',
        text: 'Restez concentré sur votre projet en prenant de courtes pauses après chaque tâche',
        image: require('../../assets/images/onboard/focus.png'),
    },
    {
        key: 4,
        title: 'Suivez votre progression',
        text: 'Analysez votre productivité grâce aux statistiques.',
        image: require('../../assets/images/onboard/stats.png'),
    }
];

export default function Onboard() {

    const { firstTime, setFirstTime } = React.useContext(Context);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
            </View>
        );
    }

    const onDone = () => {
        console.log('done');
        setFirstTime();
        navigation.navigate('App')
    }

    const renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <MaterialCommunityIcons name="arrow-right" size={30} style={styles.icon} />
            </View>
        );
    };

    const renderPrevButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <MaterialCommunityIcons name="arrow-left" size={30} style={styles.icon} />
            </View>
        );
    };

    const renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <MaterialCommunityIcons name="check" size={30} style={styles.icon} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <AppIntroSlider renderItem={renderItem}
                data={slides}
                activeDotStyle={styles.activeDot}
                onDone={onDone}
                showPrevButton={true}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}
                renderPrevButton={renderPrevButton}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    slide: {
        flex: 1,
        paddingTop: 40,
    },
    textWrapper: {
        flex: 0.3,
    },
    imageContainer: {
        flex: 0.7,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.DARK,
        marginTop: 30,
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    text: {
        fontSize: 18,
        color: Colors.GRAY,
        marginTop: 10,
        textAlign: 'center',

    },
    image: {
        width: Dimensions.get('window').width - 10,
        height: Dimensions.get('window').width - 20,
        resizeMode: 'contain',
    },
    buttonCircle: {
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: Colors.RED,
    },
    activeDot: {
        backgroundColor: Colors.RED,
    }
});
