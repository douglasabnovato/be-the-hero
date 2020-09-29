import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity } from 'react-native';
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

            <View style={ styles.incidentList }>
                <View style={ styles.incident }>
                    <Text style={ styles.incidentProperty }>ONG:</Text>
                    <Text style={ styles.incidentValue }>APAD</Text>
                    <Text style={ styles.incidentProperty }>Caso:</Text>
                    <Text style={ styles.incidentValue }>Cadelinha atropelada:</Text>
                    <Text style={ styles.incidentProperty }>Valor:</Text>
                    <Text style={ styles.incidentValue }>R$120,00</Text>
                    <TouchableOpacity 
                        style={ styles.detailsButton } 
                        onPress={ () => {} }
                    >
                        <Text style={ styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
}