import React, { useEffect, useState } from 'react';
import { View, Text, Button, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Box } from '@/components/ui/box';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ visible, onClose }) => {
    const [translateY] = useState(new Animated.Value(screenHeight)); // Position initiale en bas (hors de l'écran)

    // Animation d'ouverture/fermeture
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: visible ? 0 : screenHeight, // Position finale : 0 pour coller en bas de l'écran, screenHeight pour la cacher
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [5000]);

    return (
        <Animated.View
            className={'bg-background-success'}
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                transform: [{ translateY }],
            }}
        >
            <Box
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 4 }}
                className="bg-amber-400"
            >
                <View>
                    <Text className="text-xl font-bold">Bottom Sheet</Text>
                    <Text className="mt-2">Voici un contenu de Bottom Sheet qui vient du bas de l'écran.</Text>
                    <TouchableOpacity onPress={onClose} className="mt-4 py-2 bg-red-500 rounded-md">
                        <Text className="text-white text-center">Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Box>
        </Animated.View>
    );
};

const BottomSheetComp: React.FC = () => {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState<boolean>(true);

    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <BottomSheet visible={isBottomSheetVisible} onClose={toggleBottomSheet} />
        </View>
    );
};

export default BottomSheetComp;
