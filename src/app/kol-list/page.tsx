const fetchListedKols = async (
  cursor?: string
): Promise<{
  members: {
    screen_name: string;
  }[];
  next_cursor: string | undefined;
  more_users: boolean;
}> => {
  const res = await fetch(
    cursor
      ? `https://api.xdog.pro/tweet/list_members?list_id=1867510230386606091&cursor=${cursor}`
      : `https://api.xdog.pro/tweet/list_members?list_id=1867510230386606091`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 30,
      },
    }
  );
  return res.json();
};

const fetchDate = async (): Promise<{
  kols: {
    screen_name: string;
  }[];
}> => {
  let cursor = undefined;
  const listdKols: { screen_name: string }[] = [];

  while (true) {
    const res = await fetchListedKols(cursor);
    cursor = res.next_cursor;
    listdKols.push(...res.members);
    if (!res.more_users) break;
  }

  const res = await fetch(
    "https://api.xdog.pro/kol/super_kol?level=3day&min_rate=0.5&min_tweet_count=5"
  );
  const data = (await res.json()) as {
    kols: {
      screen_name: string;
    }[];
  };

  console.log(data.kols.length);

  const kols = data.kols.filter(
    (i) => !listdKols.some((j) => j.screen_name === i.screen_name)
  );
  console.log(kols.length);
  return { kols };
};

export default async function KolList() {
  const data = await fetchDate();

  return (
    <div className="px-20 py-10 flex flex-col items-start">
      {data?.kols.map((kol) => (
        <div key={kol.screen_name}>{kol.screen_name}</div>
      ))}
    </div>
  );
}
