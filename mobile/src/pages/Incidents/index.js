import React from 'react';
import { View, Image, Text } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos</Text>.
                </Text>
            </View>
            <View style={styles.title}>Bem-vindo !</View>
            <View style={styles.description}>Escolha um dos casos abaixo e salve o dia.</View>
        </View>
    );
}