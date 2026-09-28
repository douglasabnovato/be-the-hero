/* Detalhe do caso com contato por WhatsApp ou e-mail (avisa quando não há app disponível) */
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, Linking, Alert, ScrollView } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { brl, contactMessage, whatsappUrl } from "../../lib/api";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const { incident } = useRoute().params;

  /* Abre o app de e-mail com a mensagem pronta */
  async function sendMail() {
    if (!(await MailComposer.isAvailableAsync())) {
      Alert.alert("E-mail indisponível", `Escreva para ${incident.email}.`);
      return;
    }
    await MailComposer.composeAsync({ subject: `Herói do caso: ${incident.title}`, recipients: [incident.email], body: contactMessage(incident) });
  }

  /* Abre o WhatsApp com a mensagem pronta */
  async function sendWhatsapp() {
    try {
      await Linking.openURL(whatsappUrl(incident));
    } catch {
      Alert.alert("WhatsApp não encontrado", "Instale o WhatsApp ou use o e-mail.");
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image source={logoImg} accessibilityLabel="Be The Hero" />
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Voltar" hitSlop={12}>
          <Feather name="arrow-left" size={28} color="#c81b38" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>
        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{brl(incident.value)}</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp} accessibilityRole="button"><Text style={styles.actionText}>WhatsApp</Text></TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail} accessibilityRole="button"><Text style={styles.actionText}>E-mail</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
/* Fim de Detail/index.js */
