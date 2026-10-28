import Link from 'next/link';

interface NavItem {
  slug: string;
  title: string;
  topicId?: string | null;
  scrapable: boolean;
}

const NavLink = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {

    next: { revalidate: 3600 } 
  });
  const data = await res.json();
  const navlinks: NavItem[] = data.data || [];


  const filteredNavs = navlinks.filter((n) => n.scrapable);

  return (
    <nav className="flex flex-wrap gap-4 md:gap-6 justify-center my-4 text-sm md:text-base font-medium text-gray-700">
      <Link 
        href="/" 
        className="hover:text-[#b91c1c] transition-colors"
      >
        হোম
      </Link>

      {filteredNavs.map((nav, i) => (
        <Link
          key={i}
          href={`/category/${nav.slug}`}
          className="hover:text-[#b91c1c] transition-colors"
        >
          {nav.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavLink;