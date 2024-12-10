import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import useAuthStore from "@/components/providers/auth-provider";
import { Icons } from "@/components/icons";
import {TouchableOpacity} from "react-native";
import {router} from "expo-router";

export function Navbar() {
  const { user, logout } = useAuthStore();

  const handlePress = () => {
      router.push('./profile', { relativeToDirectory: true});
  }

  return (
    <HStack className="w-full items-center justify-between">
      <HStack className="items-center" space={"md"}>
        {user ? (
            <TouchableOpacity onPress={handlePress}>
                <Avatar size="lg">
                    <AvatarFallbackText>
                        {user.username.toUpperCase()}
                    </AvatarFallbackText>
                    <AvatarImage source={{ uri: user.profile?.avatarUrl }} />
                    <AvatarBadge />
                </Avatar>
            </TouchableOpacity>

        ) : null}
        <VStack>
          <Text bold size="xl">
            {user?.username}
          </Text>
          <Text size="md">Lvl. 4</Text>
        </VStack>
      </HStack>
      <Button
        onPress={() => logout()}
        size="lg"
        variant="outline"
        className="border-slate-300 border-[0.5px] rounded-2xl py-6 px-4"
      >
        <ButtonIcon as={Icons.logout} className="text-red-400" />
      </Button>
    </HStack>
  );
}
