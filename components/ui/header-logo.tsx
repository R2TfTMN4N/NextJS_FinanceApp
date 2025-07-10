import Link from "next/link";
import Image from "next/image";
export default function HeaderLogo(){
    return (
      <Link href={"/"}>
        <div className="items-center hidden lg:flex">
          <Image
            src="/logoipsum-379.svg"
            alt="Logo"
            height={28}
            width={28}
          ></Image>
          <p className="font-semibold text-white text-2xl ml-2"> Finance </p>
        </div>
      </Link>
    );
}