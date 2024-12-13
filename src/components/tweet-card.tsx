import { HeartIcon, ResetIcon } from "@radix-ui/react-icons";
import { Card } from "@radix-ui/themes";

export function TweetCard() {

  return (
    <Card className="flex max-w-[400px]">
      <div className="rounded-full w-10 h-10 bg-gray-200 flex-shrink-0"></div>
      <div className="ml-2">
        <div className="flex items-start gap-2">
          <div className="text-sm font-medium">Binance</div>
          <div className="text-xs text-gray-500">@binance</div>
        </div>
        <div className="text-sm">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500">12:00</div>
          <div className="text-xs text-gray-500">2024-01-01</div>
          <div className="text-xs text-gray-500">100 views</div>
        </div>
        <div className="flex items-center gap-2">
          <div className=" flex items-center text-xs text-gray-500">
            <HeartIcon />
            100
          </div>
          <div className=" flex items-center text-xs text-gray-500">
            <ResetIcon />
            100
          </div>

        </div>
      </div>
    </Card>
  );
}
