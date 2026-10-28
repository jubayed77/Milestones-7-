import Image from "next/image";
import Link from "next/link";

interface NewsCardT {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
    firstPublished?: string;
}

const MainNews = ({ news }: { news: NewsCardT[] }) => {
    // খালি অ্যারে হলে কিছু রেন্ডার করো না
    if (!news || news.length === 0) return null;

    const fastNews = news[0];
    const othernews = news.slice(1, 5);

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Featured News */}
            <Link
                href={`/news/${fastNews?.id}`}
                className="block w-full lg:w-96 shrink-0"
            >
                <div className="card bg-base-100 shadow-sm h-full">
                    <figure className="relative w-full aspect-[4/3]">
                        <Image
                            alt={fastNews?.imageAlt || fastNews?.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 384px"
                            className="object-cover"
                            src={fastNews?.imageUrl}
                        />
                    </figure>
                    <div className="card-body">
                        <p className="text-red-700 font-semibold">
                            {fastNews?.category}
                        </p>
                        <h2 className="card-title">{fastNews?.title}</h2>
                        <p className="line-clamp-2">{fastNews?.description}</p>
                    </div>
                </div>
            </Link>

            {/* Other news list */}
            <div className="w-full lg:max-w-[420px] overflow-hidden rounded-xl border border-zinc-200 bg-white">
                {othernews.map((item) => (
                    <Link
                        key={item.id}
                        href={`/news/${item.id}`}
                        className="block"
                    >
                        <div className="border-t border-zinc-200/70 px-4 pb-4 pt-[18px] first:border-t-0 hover:bg-zinc-50 transition-colors">
                            <p className="mb-1.5 block font-semibold text-[#c8102e]">
                                {item?.category}
                            </p>
                            <div className="text-lg font-semibold leading-normal text-zinc-900 line-clamp-2">
                                {item.title}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainNews;