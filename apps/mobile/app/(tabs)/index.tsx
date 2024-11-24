import { Center } from "@/components/ui/center";
import { RegisterForm } from "@/components/forms/register";
import { Text } from "react-native";

export default function HomeScreen() {
  return (
    <Center className="h-screen w-screen">
      <Text>Welcome</Text>
      <RegisterForm />
    </Center>
  );
}
