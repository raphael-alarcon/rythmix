import {Text} from "@/components/ui/text";
import {StyleSheet, TouchableOpacity} from "react-native";
import {router} from "expo-router";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {EditIcon, ExternalLinkIcon, Icon} from "@/components/ui/icon";
import {Divider} from "@/components/ui/divider";
import {Input, InputField} from "@/components/ui/input";
import {FormControl, FormControlLabel, FormControlLabelText} from "@/components/ui/form-control";
import {PasswordInput} from "@/components/ui/password-input/password-input";
import {Button, ButtonText} from "@/components/ui/button";

export default function EditProfile() {
    const handleReturn = () => {
        router.back()
    }
    return (
        <VStack className="h-screen w-screen px-6">
            <TouchableOpacity
                    onPress={handleReturn}
                    className="absolute top-16 left-4 px-4 py-2"
                >
                <Text className="font-bold">← Retour</Text>
            </TouchableOpacity>
            <VStack className="mt-32 h-full flex w-full" space="xl">
                <Heading size={"4xl"}>Éditer son profil</Heading>
                <VStack space="md" className="w-full bg-gray-100 p-4 gap-2 border border-gray-300 rounded-3xl">
                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Pseudo</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant={"underlined"}>
                            <InputField placeholder="Johnny Hood"></InputField>
                        </Input>
                    </FormControl>
                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>À propos de moi</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant={"underlined"}>
                            <InputField placeholder="Johnny Doe from da hood"></InputField>
                        </Input>
                    </FormControl>
                </VStack>
                <Button>
                    <ButtonText>Sauvegarder</ButtonText>
                </Button>
            </VStack>
        </VStack>
    )
}