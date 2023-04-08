import Image from "next/image";

function Header() {
  return (
    <header>
      {/* left */}
      <div>
        <div>
          <Image
            src="https://links.papareact.com/4t3"
            width={30}
            height={30}
            alt="logo"
          />
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
    </header>
  );
}

export default Header;
