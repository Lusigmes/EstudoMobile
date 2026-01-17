import React from "react";
import { View, Text } from "react-native";
import { DisplayProps } from "../types";
import { stylesDisplay } from "../styles";


const Display: React.FC<DisplayProps> = ({valor, expressao}) => {
    return (
        <View style={stylesDisplay.container}>
            {expressao && (
                <Text style={stylesDisplay.expressao} numberOfLines={1}>
                    {expressao}
                </Text>
            )}
            <Text style={stylesDisplay.valor} numberOfLines={1}>
                {valor}
            </Text>
        </View>
    );
};

export default Display;