import { GestureResponderEvent, Keyboard, StyleSheet, Image, View} from "react-native";
import { Appbar, Button, Text  } from 'react-native-paper';
import { BLACK, WHITE, YELLOW } from "../constants/colors";

export type ToolbarHeaderProps = {
    onClickLeftIcon? : () => void,
    label?:string,
    icon?:string,
   
}

const ToolbarHeader = (props : ToolbarHeaderProps) => {
 


    return (
        <Appbar.Header style={{backgroundColor:YELLOW,borderColor:YELLOW,borderBottomColor:'black',borderWidth:0.4}} >
             <Appbar.Action icon={()=>  <Image
                   style={{width:25,top:0,height:25,resizeMode:'center'}}
                source={(props.icon ?  require('../assets/home/back.png'):  require('../assets/home/menu.png'))} />} onPress={props.onClickLeftIcon} />
            <Appbar.Content  title={props.label??"Demo"} 
            titleStyle={{textAlign: 'center'}} 
            />
           <View style={{width:40,height:40}}></View>
        </Appbar.Header>
);
}
export default ToolbarHeader;

const styles= StyleSheet.create({
    container:{
        borderRadius:5,
        backgroundColor:BLACK,
        height:45,
    }
})