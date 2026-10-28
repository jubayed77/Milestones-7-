import Newscard from "@/component/Newscard";

const CategoryNews = async ({ params }: { params: Promise<{ categoryid: string }> }) => {
    const { categoryid } = await params;
    
    // API থেকে ডেটা ফ্যাচ করা হচ্ছে
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryid}`, {
        cache: 'no-store' // অথবা রেসপন্স আপডেট রাখতে 'force-cache' ব্যবহার করতে পারেন
    });
    
    const data = await res.json();
    const categoryNews = data?.data || []; // ডেটা না থাকলে খালি অ্যারে সেট হবে

    return (
        <div>
            <h1 className="text-2xl font-bold border-b-2 border-red-700 mb-5">
                {data?.title || "সংবাদ"}
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {categoryNews?.length > 0 ? (
                    categoryNews.map((news: any) => (
                        <Newscard key={news._id || news.id} news={news} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        কোনো খবর পাওয়া যায়নি।
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoryNews;