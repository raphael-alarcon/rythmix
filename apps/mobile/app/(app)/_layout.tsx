import useAuthStore from "@/components/providers/auth-provider";
import { Redirect, Slot } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Center } from "@/components/ui/center";

export default function AppLayout() {
  const { me } = useAuthStore();

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: me,
  });

  if (isLoading) {
    return (
      <Center className={"h-screen"}>
        <Spinner size="large" />
      </Center>
    );
  }

  if (!user) {
    return <Redirect href="/register" />;
  }

  return <Slot />;
}
