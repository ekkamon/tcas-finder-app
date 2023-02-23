import Link from 'next/link';
import { FC } from 'react';
import { useRouter } from 'next/router';

interface INavItem {
  text: string;
  href?: string;
}

const NavMenu: Array<INavItem> = [
  {
    text: 'หน้าแรก',
    href: '/',
  },
  {
    text: 'ติดต่อเรา',
    href: 'https://facebook.com/',
  },
];

const NavItem: FC<INavItem> = ({ text, href }) => {
  const router = useRouter();
  return (
    <li className="py-2">
      <Link
        href={'' + href}
        className={`py-2 ${router.pathname == href && 'text-black'}`}
      >
        {text}
      </Link>
    </li>
  );
};

export const Navbar: FC = () => {
  return (
    <div className="fixed w-full px-5 py-1.5 flex justify-center border-b border-zinc-100">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center">
            <span className="font-bold font-eng text-xl uppercase">
              TcasFinder
            </span>
          </div>
          <div className="w-auto">
            <ul className="flex flex-cols gap-10 text-zinc-500">
              {NavMenu.map((v, i) => {
                return <NavItem key={i} text={v.text} href={v.href} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
