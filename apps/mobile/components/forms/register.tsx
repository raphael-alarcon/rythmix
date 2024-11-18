import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import { Text } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/ui/password-input/password-input";
import { Link, LinkText } from "@/components/ui/link";
import { openURL } from "expo-linking";
import { useAuth } from "@/components/providers/auth-provider";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export function RegisterForm() {
  const { logout } = useAuth();

  const [result, setResult] = useState({});

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "http://localhost:3333/spotify/redirect",
    );
    console.log(result);
    setResult(result);
  };
  return (
    <VStack className="w-80">
      <Center className="mb-4">
        <Heading className="font-bold">Welcome!</Heading>
        <HStack className="inline-flex items-center">
          <Text className="text-slate-500">Already a player?</Text>
          <Link href="https://gluestack.io/" isExternal className="ml-1">
            <LinkText className="font-semibold no-underline">Sign in</LinkText>
          </Link>
        </HStack>
      </Center>
      <VStack space="md" className="w-full">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField placeholder="johndoe@gmail.com"></InputField>
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <PasswordInput placeholder="Enter your password" />
          </Input>
        </FormControl>
        <Button onPress={_handlePressButtonAsync}>
          <ButtonText>Sign up</ButtonText>
        </Button>
        <HStack className="my-1 w-full relative">
          <Center className="w-full">
            <Divider className="absolute bg-background-500" />
            <Text className="bg-background-100 text-background-500 px-2">
              Or
            </Text>
          </Center>
        </HStack>
        <Button
          variant="outline"
          onPress={() => {
            openURL("http://localhost:3333/spotify/redirect");
          }}
        >
          <ButtonText>Connect with</ButtonText>
          <Icon as={Icons.spotify} color="black" />
        </Button>
      </VStack>
    </VStack>
  );
}
