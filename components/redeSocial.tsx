import {
    View,
    Image,
    Pressable,
    Linking,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const redes = [
    {
        id: 1,
        foto: require('../assets/DiogoFoto.png'),
        linkedin: 'https://www.linkedin.com/in/diogo-navarrete-1713432a1',
        insta: 'https://www.instagram.com/diogo._gomezz'
    },
    {
        id: 2,
        foto: require('../assets/EmilyFoto.jpg'),
        linkedin: 'https://www.linkedin.com/in/emily-chagas/',
        insta: 'https://www.instagram.com/emy_vk'
    },
    {
        id: 3,
        foto: require('../assets/JonasFoto.png'),
        linkedin: 'http://www.linkedin.com/in/jonas-godoy-7425a7217',
        insta: 'https://www.instagram.com/jonass_godoy'
    },
    {
        id: 4,
        foto: require('../assets/ViniciusFoto.png'),
        linkedin: 'https://www.linkedin.com/in/vinicius-m-42664b1a4',
        insta: 'https://www.instagram.com/pensas_sp'
    }
];

const RedeSocial = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: 20,
                gap: 20 
            }}
        >
            {redes.map((item) => (
                <View
                    key={item.id}
                    style={{
                        width: 120,
                        height: 160,
                        alignItems: 'center',
                        padding: 10,
                        margin: 10, 
                    }}
                >
                    <Image
                        source={item.foto}
                        style={{
                            width: '100%',
                            height: 100,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: '100%',
                            paddingVertical: 4,
                        }}
                    >
                        <Pressable onPress={() => Linking.openURL(item.linkedin)}>
                            <FontAwesome name="linkedin-square" size={28} color="#0077B5" />
                        </Pressable>

                        <Pressable onPress={() => Linking.openURL(item.insta)}>
                            <FontAwesome name="instagram" size={28} color="#C13584" />
                        </Pressable>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default RedeSocial;