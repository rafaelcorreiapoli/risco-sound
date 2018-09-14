import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Image } from 'react-native';
import Expo from 'expo'
import { ScrollView } from 'react-native-gesture-handler';

const soundMap = {
  belessa: {
    sound: require(`./assets/belessa.wav`),
    isDevil: false,
  },
  design: {
    sound: require(`./assets/design.wav`),
    isDevil: false,
  },
  framework: {
    sound: require(`./assets/framework.wav`),
    isDevil: false,
  },
  objecto: {
    sound: require(`./assets/objecto.wav`),
    isDevil: false,
  },
  pla: {
    sound: require(`./assets/pla.wav`),
    isDevil: false,
  },
  requisitoNoFuncional: {
    sound: require(`./assets/requisito-no-funcional.wav`),
    isDevil: false,
  },
  segurancaComunicacao: {
    sound: require(`./assets/seguranca-comunicacao.wav`),
    isDevil: false,
  },
  segurancaDaTelaDevil: {
    sound: require(`./assets/seguranca-da-tela-devil.wav`),
    isDevil: true,
  },
  segurancaDaTela: {
    sound: require(`./assets/seguranca-da-tela.wav`),
    isDevil: false,
  },
  segurancaDeDados: {
    sound: require(`./assets/seguranca-de-dados.wav`),
    isDevil: false,
  },
  segurancaLogicaNegocio: {
    sound: require(`./assets/seguranca-logica-negocio.wav`),
    isDevil: false,
  },
  taBomBelessa: {
    sound: require(`./assets/ta-bom-belessa.wav`),
    isDevil: false,
  },
  tenico: {
    sound: require(`./assets/tenico.wav`),
    isDevil: false,
  },
}

const arrayToPairs = (arr) => arr.reduce((result, value, index, array) => {
  if (index % 2 === 0)
    result.push(array.slice(index, index + 2));
  return result;
}, []);

const objectToArray = (obj) => Object.keys(obj).reduce((acc, k) => {
  return [
    ...acc,
    obj[k]
  ]
}, [])
const pairs = arrayToPairs(objectToArray(soundMap))
console.log(pairs)

const RiscoPicture = () => (
  <Image
    style={{width: 100, height: 100}}
    source={{uri: 'https://i1.rgstatic.net/ii/profile.image/624346691301378-1525867259473_Q512/Jorge_Becerra11.jpg'}}
  />
)

const Row = ({
  children
}) => (
  <View style={{flexDirection: 'row', flex: 1, height: 150}}>
    {children}
  </View>
)
const Cell = ({
  children,
  backgroundColor
}) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor}}>
    {children}
  </View>
)

const RiscoButton = ({
  onPress
}) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      style={{width: 100, height: 100}}
      source={{uri: 'https://lh5.ggpht.com/mbqDHjHSKKyOtFAmqKJu5qeM09iF4tdPhjGn-FfKafYVfmuOs7idCXqiWMYW751HQCI=w300'}}
    />
  </TouchableOpacity>
)

const playOnce = (soundAsset) => new Promise(async (resolve, reject) => {
  try {
    const { sound: soundObject } = await Expo.Audio.Sound.create(
      soundAsset,
      { shouldPlay: true }
    );
    soundObject.setOnPlaybackStatusUpdate((status) => {
      if (status.playableDurationMillis === status.positionMillis) {
        resolve()
      }
    })
  } catch (error) {
    reject(error)
  }
})
export default class App extends React.Component {
  state = {
    isPlaying: false
  }
  play = (soundAsset, isDevil = false) => async () => {
    if (this.state.isPlaying) {
      return
    }
    this.setState({
      isPlaying: true,
      isDevil
    })
    try {
      await playOnce(soundAsset)
    } catch(err) {
      alert(err.toString())
    } finally {
      this.setState({
        isPlaying: false
      })
    }
    
  }
  // belessa: require(`./assets/belessa.wav`),
  // design: require(`./assets/design.wav`),
  // framework: require(`./assets/framework.wav`),
  // objecto: require(`./assets/objecto.wav`),
  // pla: require(`./assets/pla.wav`),
  // requisitoNoFuncional: require(`./assets/requisito-no-funcional.wav`),
  // segurancaComunicacao: require(`./assets/seguranca-comunicacao.wav`),
  // segurancaDaTelaDevil: require(`./assets/seguranca-da-tela-devil.wav`),
  // segurancaDaTela: require(`./assets/seguranca-da-tela.wav`),
  // segurancaDeDados: require(`./assets/seguranca-de-dados.wav`),
  // segurancaLogicaNegocio: require(`./assets/seguranca-logica-negocio.wav`),
  // taBomBelessa: require(`./assets/ta-bom-belessa.wav`),
  // tenico: require(`./assets/tenico.wav`),
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {pairs && pairs.map((pair, i) => (
            <Row key={i}>
              {pair[0] && (
                <Cell backgroundColor={i % 2 === 0 ? 'tomato' : 'steelblue'}>
                  <RiscoButton onPress={this.play(pair[0].sound, pair[0].isDevil)} />
                </Cell>
              )}
              {pair[1] ? (
                <Cell backgroundColor={i % 2 !== 0 ? 'tomato' : 'steelblue'}>
                  <RiscoButton onPress={this.play(pair[1].sound, pair[1].isDevil)} />
                </Cell>
              ) : (
                <Cell backgroundColor={i % 2 !== 0 ? 'tomato' : 'steelblue'}>
                  
                </Cell>
              )}
            </Row>
          ))}
        
      </ScrollView> 
        {this.state.isPlaying && <Image
            style={{
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              position: 'absolute',
              backgroundColor: this.state.isDevil ? 'red': 'transparent',
            }}
            resizeMode="contain"
            source={{uri: 
              this.state.isDevil
              ? 'https://conferenciaasrconsultoria.files.wordpress.com/2013/09/jorge_risco2-e1379538353898.jpg'
              : 'https://i1.rgstatic.net/ii/profile.image/624346691301378-1525867259473_Q512/Jorge_Becerra11.jpg'
            }}
          />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
