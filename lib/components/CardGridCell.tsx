import { Card, Text } from "react-native-paper"
import { StyleSheet, View,Image, ImageSourcePropType, TouchableOpacity, GestureResponderEvent } from "react-native"
import { BLACK, YELLOW } from "../constants/colors"

export type CardGridCellProps = {
    title: string,
    icon: ImageSourcePropType,
    description: string,
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const CardGridCell = (props: CardGridCellProps) => {
    return (
        <Card style={styles.container}>
            <TouchableOpacity onPress={props.onPress}>
            <View style={{backgroundColor:YELLOW,borderRadius:60/2,width:60,height:60,alignItems:'center',justifyContent:'center' }}>
            <Image
                resizeMode="center"
                source={props.icon}
                style={{ width: 28, height: 28, }}
            />
            </View>
            <Text style={styles.txt}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
            </TouchableOpacity>
        </Card>)
}

export default CardGridCell;

export const styles = StyleSheet.create({
    container: {
        padding:16,
        flex:1,
        margin:10,
        backgroundColor:'white',
    },
    txt: {
        color:BLACK,
        marginTop:16,
        fontSize:20,
        fontWeight:'500'

    },
    description: {
        color:'#757575CC',
        fontSize:12,
        marginTop:4,
    }
});