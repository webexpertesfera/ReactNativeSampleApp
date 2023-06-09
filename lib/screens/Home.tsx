import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../types";
import { Divider, useTheme } from "react-native-paper";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BLACK, GREY, YELLOW } from "../constants/colors";
import ToolbarHeader from "../components/ToolbarHeader";
import CardGridCell from "../components/CardGridCell";
export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>){
    const styles = useStyles();
   
 
 return (<View style={styles.container}>
            <ToolbarHeader  onClickLeftIcon={()=>{
            }}/>
            <ScrollView>
                <View style={{flex:1,flexDirection:'row'}}>
                    <CardGridCell 
                    onPress={()=>{
                    }}
                       title = "Section 1"
                       icon={require('../assets/home/read.png')}
                       description="Lorem Ipsum  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum "
                    />
                     <CardGridCell 
                        onPress={()=>{
                       }}
                       title = "Section 2"
                       icon={require('../assets/home/write.png')}
                       description="Lorem Ipsum  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum "
                    />
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <CardGridCell 
                       title = "Section 3"
                       onPress={()=>{
                       }}
                       icon={require('../assets/home/archive.png')}
                       description="Lorem Ipsum  Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum "
                    />
                    <Divider style={{flex:1,margin:10, backgroundColor:'transparent'}}/>
                </View>
            </ScrollView>
    </View>)
}

const useStyles = () => {
    const theme = useTheme();
    const styles = React.useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flexDirection: 'column',
                    backgroundColor: YELLOW,
                    flex: 1,
                },
                heading: {
                    color: BLACK,
                    marginTop: 20,
                    fontWeight: 'bold',
                    fontSize: 26
                },
                headingDesc: {
                    color: BLACK, marginTop: 20, fontWeight: '500', fontSize: 24
                },
                headingDesc2: {
                    color: GREY, marginTop: 8, fontWeight: 'normal', fontSize: 14
                },
                forgotPwd: {
                    color: GREY, alignSelf: 'flex-end', marginTop: 8, fontWeight: 'normal', fontSize: 14
                },
                socialContainer: {
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10
                },
                imgSocialIcon: {
                    width: 50, height: 50, resizeMode: "center"
                },
                labelOr: {
                    color: GREY, marginTop: 8, fontWeight: 'normal', fontSize: 14
                }
            }),
        [theme]
    );
    return styles;
};