import { Tweet } from "@/types";
import { EyeOpenIcon, HeartIcon, ResetIcon } from "@radix-ui/react-icons";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

export function TweetCard({ tweet }: { tweet: Tweet }) {
  const time = dayjs(tweet.created_at).format("HH:mm");
  const date = dayjs(tweet.created_at).format("YYYY-MM-DD");

  return (
    <Card className="flex gap-2 max-w-[400px] px-6 py-4" asChild>
      <a
        href={`https://twitter.com/${tweet.screen_name}/status/${tweet.tweet_id}`}
        target="_blank"
      >
        <Link
          href={`https://twitter.com/${tweet.screen_name}`}
          target="_blank"
          className="rounded-full w-10 h-10 flex-shrink-0 overflow-hidden"
        >
          <Image
            src={tweet.user_info.avatar}
            width={80}
            height={80}
            alt="avatar"
          />
        </Link>
        <div className="flex flex-col gap-2">
          <a
            href={`https://twitter.com/${tweet.screen_name}`}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2"
          >
            <div className="text-sm font-medium">{tweet.user_info.name}</div>
            <div className="text-xs text-gray-500">@{tweet.screen_name}</div>
          </a>
          <div className="text-sm w-full break-all">{tweet.text}</div>
          <div className="flex items-center gap-1">
            {tweet.media.photo?.map((photo) => (
              <Card key={photo.media_url_https} className="h-40 w-full">
                <Image
                  fill={true}
                  src={photo.media_url_https}
                  alt="media"
                  className="object-cover"
                />
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-auto text-nowrap">
            <div className="flex items-center gap-1">
              <div className="text-xs text-gray-500">{time}</div>
              <div className="text-xs text-gray-500">{date}</div>
            </div>
            <div className=" flex items-center text-xs text-gray-500 gap-1">
              <EyeOpenIcon />
              {tweet.views}
            </div>
            <div className=" flex items-center text-xs text-gray-500 gap-1">
              <HeartIcon />
              {tweet.favorites}
            </div>
            <div className=" flex items-center text-xs text-gray-500 gap-1">
              <ResetIcon />
              {tweet.retweets}
            </div>
          </div>
        </div>
      </a>
    </Card>
  );
}
