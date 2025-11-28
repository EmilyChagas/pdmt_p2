import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import FotoDoDia from './components/fotoDoDia';
import BuscarNasa from './components/busca';
import RedeSocial from './components/redeSocial';
import ExibeFoto from './components/exibeFoto';
export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fotoDoDia}>
        <FotoDoDia />
      </View>
      <View style={styles.galeria}>
        <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
            <BuscarNasa />
        </View>   
      </View>
      <View style={styles.footer}>
        <RedeSocial></RedeSocial>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0B0C15',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },

  fotoDoDia: {
    width: '100%',
    paddingTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  galeria: {
    width: '100%',
    maxWidth: 1000,
    height: 'auto',
    // backgroundColor: '#0F121F',
    // borderRadius: 16,
    padding: 16,
    // marginVertical: 20,
  },

  footer: {
    width: '100%',
    backgroundColor: '#1C2135',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    width: '10%',
    height: '80%',
    backgroundColor: '#323b5fff',
    borderRadius: 16,
    paddingTop: 5
  },

  buttonFiltro: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonDestaque: {
    width: 55,
    height: 55,
    backgroundColor: "#FF8630",
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center"
  },

  input: {
    width: '60%',
    marginBottom: 12,
    textAlign: 'left',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#D9D9D9'
  }
});
