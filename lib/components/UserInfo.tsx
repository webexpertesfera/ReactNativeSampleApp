import { GestureResponderEvent, Image, StyleSheet, View ,} from "react-native";
import { Text, TouchableRipple } from 'react-native-paper';
import { BLACK, } from "../constants/colors";
import { Avatar } from 'react-native-paper';
export type UserInfoProps = {
    image: string,
    name?: string,
    email?: string,
    img?:string,
    onPress: (e: GestureResponderEvent) => void;

}

const UserInfo = (props: UserInfoProps) => {
    return (
        <View
            style={{
                marginHorizontal: 20,
                marginTop: 20,
                marginBottom: 10,
                justifyContent: 'center',
                elevation: 0,
                backgroundColor: 'white',
                borderRadius: 5,
                paddingStart: 16,
                paddingVertical:16
            }}>
            <View style={{ flexDirection: 'row' }}>
            <Image
                            resizeMode="cover"
                            
                            style={{ width: 50, height: 50, borderRadius: 50 / 2,backgroundColor:'black' }}
                            source={{ uri: props.image }}
                        /> 
                 <View style={{ flexDirection: 'column', justifyContent: 'center', marginStart: 25,flex:1 }}>
                    <Text style={{ color: 'black', fontSize: 24, }}>{props.name}</Text>
                    <Text style={{ fontSize: 14, marginTop: 2, color: '#434343' }}>{props.email}</Text>
                </View>
                <TouchableRipple
                    style={{width:40,height:40,marginHorizontal:5,alignItems:'center',justifyContent:'center',borderRadius:40/2}}
                    onPress={props.onPress}
                >
                <Image style={{width:30,height:30,resizeMode:'center'}}  source={require('../assets/more/edit.png')}/>
                </TouchableRipple>
            </View>

        </View>
    );
}

export default UserInfo;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: BLACK,
        height: 45,
    },
    profilePhoto: {
        width: 68,
        height: 68,
        resizeMode: 'center'
    }
})