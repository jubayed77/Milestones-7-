import Link from "next/link";

export interface MostReadItem {
    id: string;
    title: string;
    category: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
}

export interface MostReadApiResponse {
    data: MostReadItem[];
}

const MostRead = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read", {
        cache: "no-store",
    });

    const data: MostReadApiResponse = await res.json();
    const mostreadData: MostReadItem[] = data?.data || [];

    // ক্যাটাগরি অথবা ডিফল্ট টাইটেল
    const titleData = mostreadData[0]?.category || "সর্বাধিক পঠিত";

    return (
        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                    {titleData}
                </h2>
                {mostreadData.map((item, index) => (
                    <Link  href={`news/${item.id}`} key={item.id}>
                        <div key={item.id || index} className="flex items-start gap-3">
                            <span className="text-red-600 font-bold text-lg min-w-[20px] text-right">
                                {index + 1}
                            </span>
                            <p className="text-gray-800 text-xl font-medium hover:text-red-600 leading-snug cursor-pointer">
                                {item.title}
                            </p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
};

export default MostRead;