import { Center } from "@/components/ui/center";
import { RegisterForm } from "@/components/forms/register";
import { useAuth } from "@/components/providers/auth-provider";
import { Text } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <Center className="h-screen w-screen">
      <Text>Welcome, {user?.email}</Text>
      <RegisterForm />
    </Center>
  );
}
