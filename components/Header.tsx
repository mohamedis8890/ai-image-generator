import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 bg-white backdrop-blur-md shadow-md sticky z-50">
      {/* left */}
      <div className="flex space-x-2 items-center">
        <Image
          src="https://links.papareact.com/4t3"
          width={30}
          height={30}
          alt="logo"
        />
        <div>
          <h1 className="font-bold">
            The MoDev <span className="text-violet-400">AI</span> Image
            Generator
          </h1>
          <h2 className="text-xs ">
            Powered by DALL.E 2, ChatGPT and Microsoft Azure
          </h2>
        </div>
      </div>
      {/* right */}
      <div className="flex items-center text-xs md:text-base divide-x text-gray-500">
        <Link
          className="px-2 font-light text-right"
          href="https://www.modev.guru/"
          target="_blank"
        >
          Check out my other projects
        </Link>
        <Link
          className="px-2 font-light"
          href="https://github.com/mohamedis8890/ai-image-generator"
          target="_blank"
        >
          Github Repo
        </Link>
      </div>
    </header>
  );
}

export default Header;
