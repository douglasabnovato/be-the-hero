/* Lista paginada de casos com rolagem infinita, estados de carregando, vazio e erro */
import { useCallback, useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchIncidents, brl } from "../../lib/api";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const busy = useRef(false);
  const navigation = useNavigation();

  /* Carrega a próxima página, se houver */
  const loadIncidents = useCallback(async () => {
    if (busy.current || (total > 0 && incidents.length >= total)) return;
    busy.current = true;
    setLoading(true);
    try {
      const { items, total: t } = await fetchIncidents(page.current);
      setIncidents((list) => [...list, ...items.filter((i) => !list.some((x) => x.id === i.id))]);
      setTotal(t);
      page.current += 1;
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }, [incidents.length, total]);

  useEffect(() => { loadIncidents(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} accessibilityLabel="Be The Hero" />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} {total === 1 ? "caso" : "casos"}</Text>.
        </Text>
      </View>
      <Text style={styles.title} accessibilityRole="header">Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
      {error ? (
        <TouchableOpacity onPress={loadIncidents} accessibilityRole="button"><Text style={styles.error}>{error} Toque para tentar de novo.</Text></TouchableOpacity>
      ) : null}
      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={!loading && !error ? <Text style={styles.description}>Nenhum caso aberto no momento.</Text> : null}
        ListFooterComponent={loading ? <ActivityIndicator color="#c81b38" style={{ margin: 16 }} /> : null}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{brl(incident.value)}</Text>
            <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate("Detail", { incident })}
              accessibilityRole="button" accessibilityLabel={`Ver mais detalhes do caso ${incident.title}`}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#c81b38" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
/* Fim de Incidents/index.js */
