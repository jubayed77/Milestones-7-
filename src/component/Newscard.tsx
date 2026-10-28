import Image from "next/image";
import Link from "next/link";

interface NewsCardT {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
    firstPublished: string;
}

const Newscard = ({ news }: { news: NewsCardT }) => {
    return (
        <div className="card bg-base-100 shadow-sm">
            <Link href={`/news/${news.id}`} className="block">
                <figure>
                    <Image
                        height={600}
                        width={600}
                        src={news.imageUrl}
                        alt={news.imageAlt || news.title}
                    />
                </figure>
                <div className="card-body">
                    <p className="text-red-700 font-semibold">{news.category}</p>
                    <h2 className="card-title">{news.title}</h2>
                    <p>{news.description}</p>
                    <p className="text-xs">{news.firstPublished}</p>
                </div>
            </Link>
        </div>
    );
};

export default Newscard;