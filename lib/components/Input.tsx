import { TextInput } from "react-native-paper"
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";
import React from "react";
export type InputTypeProps = {
    value?: string,
    placeHolderText?: string,
    icon?: any,
    onChange?: ((text: string) => void) | undefined,
    keyboadType?: KeyboardTypeOptions | undefined,
    secureTextEntry?: boolean | false,
    isEditable ? :boolean |true
}

const InputBar = (props: InputTypeProps) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(props.secureTextEntry ?? false);
    return (
        <View
            style={styles.container}
        >
            <TextInput
                underlineColor="transparent"
                mode="outlined"
                outlineColor="white"
                editable={props.isEditable}
                activeOutlineColor="black"
                outlineStyle={{ borderWidth: 0.5 }}
                placeholder={props.placeHolderText}
                onChangeText={props.onChange}
                secureTextEntry={secureTextEntry}
                value={props.value}
                right={(props.secureTextEntry? <TextInput.Icon onPress={()=>{
                        setSecureTextEntry(!secureTextEntry)

                }} icon={secureTextEntry? "eye":"eye-off"} />:<></>) }
            />
        </View>
    )
}
export default InputBar;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
    },
    containerBg: {
        flex: 1,
        borderRadius: 3,
    },
})