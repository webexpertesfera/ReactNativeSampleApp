import { GestureResponderEvent, ImageSourcePropType,Image, StyleSheet, View } from "react-native"
import { Button, Card, Divider, Modal, Text } from "react-native-paper";
import { BLACK, WHITE } from "../constants/colors";

export type CommonAlertProps = {
    icon: ImageSourcePropType,
    title?: string,
    description?: string,
    btnOkayPlaceHolder?: string,
    btnCancelPlaceHolder?: string,
    onClickOk?: (e: GestureResponderEvent) => void,
    onClickCancel?: (e: GestureResponderEvent) => void,
}

const DefaultCommonAlert = (props: CommonAlertProps) => {
    return (
    <Card style={styles.container}>
        <View style={{alignItems:'center',justifyContent:'center',width:'80%'}}>
        <Image source={props.icon} style={{width:90,height:90,resizeMode:'contain'}} />
        <Text style={styles.txtTitle}>{props.title}</Text>
        <Text style={styles.txtDesc}>{props.description}</Text>
        <Divider  style={{
             marginTop:34,
        }}/>
        <Button
            onPress={props.onClickOk}
            style={styles.btnOkayPlaceHolder}
            textColor={WHITE}>
            {props.btnOkayPlaceHolder}
        </Button>
        {props.btnCancelPlaceHolder  ? <Button
            onPress={props.onClickCancel}
             style={styles.btnCancelPlaceHolder}
            textColor={BLACK}
        >
            {props.btnCancelPlaceHolder}
        </Button> :<></>}
        </View>
    </Card>)
}

export default DefaultCommonAlert;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        alignItems:'center',
        paddingVertical:60,
        justifyContent:'center',
    },
    txtTitle: {
        marginTop:27,
        fontSize:18,
        color:'black',
        fontWeight:"700",
        textAlign:'center',
    },
    txtDesc: {
        color:'#00000066',
        fontSize:14,
        marginTop:12,
        textAlign:'center',

    },
    btnOkayPlaceHolder: {
        borderRadius:5,
        minWidth:180,
        marginTop:10,
        backgroundColor:'black',

    },
    btnCancelPlaceHolder: {
        borderRadius:5,
        minWidth:180,
        marginTop:10,
        backgroundColor:WHITE,
        borderColor:BLACK,
        borderWidth:1,
    }
});