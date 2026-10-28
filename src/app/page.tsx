import MainNews from "@/component/MainNews";
import MostRead from "@/component/MostRead";
import Newscard from "@/component/Newscard";

export interface ArticleT {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  firstPublished?: string;
}

export interface OtherSectionDataT {
  curationId: string;
  title: string;
  articles: ArticleT[];
}

export interface NewsApiResponseT {
  data: {
    curationId: string;
    title: string;
    articles: ArticleT[];
  }[];
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    cache: "no-store",
  });

  const data: NewsApiResponseT = await res.json();
  const sections = data?.data || [];

  const mainNews: ArticleT[] = sections[0]?.articles || [];
  const othersection: OtherSectionDataT[] = sections.slice(1);

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
        {/* বামের মেইন কন্টেন্ট এলাকা (২ কলাম) */}
        <div className="lg:col-span-2">
          <MainNews news={mainNews} />

          <div className="grid gap-8 mt-8">
            {othersection.map((othersectiondata) => (
              <div key={othersectiondata.curationId}>
                <h1 className="text-2xl font-semibold border-b-2 border-red-700 pb-1">
                  {othersectiondata.title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {othersectiondata.articles
                    ?.filter((n): n is ArticleT => Boolean(n))
                    .map((news, ind) => (
                      <Newscard key={news?.id ?? ind} news={news} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ডানের সাইডবার / MostRead (১ কলাম) */}
        <div className="lg:col-span-1">
          <MostRead />
        </div>
      </div>
    </div>
  );
}