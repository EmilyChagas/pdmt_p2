import {
    Text,
    View,
    Image,
} from 'react-native';
const ExibeFoto = () => {
    return (
        <View
            style={{
                height: 150,
                width: 100,
                borderRadius: 16,
                margin: 20,
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: 4
            }}>
            <Text style={{ color: 'white', textAlign: 'left', fontSize: 14 }}>Titulo</Text>
            <Image
                source={{}}
                style={{ width: '100%', height: '100%', borderRadius: 10, flexDirection: 'row', backgroundColor: '#fff' }} >
            </Image>
            <Text style={{ color: 'white', textAlign: 'left', fontSize: 12 }}>Descrição</Text>
        </View>
    )
}
export default ExibeFoto