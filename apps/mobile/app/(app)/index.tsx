import { VStack } from "@/components/ui/vstack";
import { Navbar } from "@/components/navbar";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import BottomSheetComp from "@/components/BottomSheet";
import {View} from "react-native";

export default function HomeScreen() {

  return (
      <>
        <VStack className="h-screen w-screen items-center px-6">
          <VStack className="mt-20 h-full flex w-full" space="4xl">
            <Navbar/>

            <VStack className="flex-1 justify-start w-full" space={"md"}>
              <VStack>
                <HStack className="justify-between items-center">
                  <Text bold size="3xl">
                    Friends
                  </Text>
                  <Text className="text-typography-500">Show all</Text>
                </HStack>
                <Card></Card>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </>
  );
}
