/* Estilos da lista de casos (cores com contraste AA; antes havia erro de sintaxe e cor sem #) */
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingTop: Constants.statusBarHeight + 20, backgroundColor: "#f0f0f5" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerText: { fontSize: 15, color: "#5e5e6b" },
  headerTextBold: { fontWeight: "bold" },
  title: { fontSize: 30, marginBottom: 16, marginTop: 48, color: "#13131a", fontWeight: "bold" },
  description: { fontSize: 16, lineHeight: 24, color: "#5e5e6b" },
  error: { color: "#b3261e", marginTop: 16, fontSize: 15 },
  incidentList: { marginTop: 32 },
  incident: { padding: 24, borderRadius: 8, backgroundColor: "#FFF", marginBottom: 16 },
  incidentProperty: { fontSize: 14, color: "#41414d", fontWeight: "bold" },
  incidentValue: { marginTop: 8, fontSize: 15, marginBottom: 24, color: "#5e5e6b" },
  detailsButton: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", minHeight: 44 },
  detailsButtonText: { color: "#c81b38", fontSize: 15, fontWeight: "bold" },
});
/* Fim de Incidents/styles.js */
