export const Navbar = () => {
  return (
    <div className="fixed w-full px-5 py-5 flex justify-center">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center">
            <span className="font-bold font-eng text-xl uppercase">
              TcasFinder
            </span>
          </div>
          <div className="w-auto">
            <ul className="flex flex-cols gap-10">
              <li>หน้าแรก</li>
              <li>ติดต่อเรา</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
