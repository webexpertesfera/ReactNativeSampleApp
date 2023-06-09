import { GestureResponderEvent, Keyboard, StyleSheet, View } from "react-native";
import { Button  } from 'react-native-paper';
import { BLACK, WHITE } from "../constants/colors";

export type ButtonProps = {
    onClick :  (e: GestureResponderEvent) => void,
    value?:string,
}

const ButtonBar = (props : ButtonProps) => {
    return (
        <Button
            style={{backgroundColor:BLACK,borderRadius:5,minWidth:140,marginTop:20}}
            onPress={props.onClick}
            textColor={WHITE}
        >
            {props.value}
        </Button>
);
}

export default ButtonBar;

const styles= StyleSheet.create({
    container:{
        borderRadius:5,
        backgroundColor:BLACK,
        height:45,
    }
})