import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  return (
    <VStack className="h-screen w-screen justify-center">
      <Center className="mt-20 h-full flex w-11/12">
        <Navbar />
        <Card>
          <VStack>
            <Text>Welcome to Rythmix!</Text>
            <Text>Get started by logging in or registering.</Text>
          </VStack>
        </Card>
      </Center>
    </VStack>
  );
}
