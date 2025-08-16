import { WELCOME_BANNER_MESSAGE } from "@/constants/welcomBannerMessage";
import { useUser } from "@/hooks/useUser";

export const UserWelcomeBanner = () => {
  const { user } = useUser();

  const getRandomMessage = () => {
    const randomIndex = Math.floor(
      Math.random() * WELCOME_BANNER_MESSAGE.length,
    );
    return WELCOME_BANNER_MESSAGE[randomIndex];
  };

  const convertMessage = (message: string) => {
    return message.replace("${닉네임}", user?.nickname || "");
  };

  return (
    <div className="absolute top-0 left-[50%] w-full translate-x-[-50%] translate-y-[calc(-100%-20px)]">
      <h1 className="text-center text-2xl font-bold text-gray-300">
        {convertMessage(getRandomMessage())}
      </h1>
    </div>
  );
};
