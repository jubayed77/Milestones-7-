import Image from "next/image";

const NewsDetails = async ({ params }: { params: Promise<{ newsid: string }> }) => {
    const { newsid } = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${newsid}`, {
        cache: 'no-store'
    });
    const data = await res.json();
    const news = data?.data;
    // console.log(news);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{news?.title}</h1>
            
            {/* যদি imageUrl থাকে এবং তা খালি স্ট্রিং না হয়, তবেই কেবল ইমেজ দেখাবে */}
            {news?.imageUrl && news.imageUrl !== "" && (
                <div className="my-4">
                    <Image
                        className="mx-auto rounded-lg object-cover"
                        alt={news?.title || "this is alt"}
                        src={news.imageUrl}
                        height={600} 
                        width={600} 
                    />
                </div>
            )}

            <p className="mt-4 leading-relaxed">{news?.text || news?.description}</p>
        </div>
    );
};

export default NewsDetails;