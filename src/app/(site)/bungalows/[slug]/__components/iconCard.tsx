import Image, { StaticImageData } from "next/image";

const IconCard = ({url, name, count}: {url: string | StaticImageData, name: string, count: number}) => {
    return (
        <div
            className="border border-gray-200 p-2 bg-[#F9FAFB] rounded-xl"
        >
            <li className="text-gray-600 flex flex-col gap-1 items-center border border-[#E5E7EB] p-2 shadow-md rounded-xl bg-white">
                <Image className="w-16" src={url} alt={name} />
                <span className="font-medium">
                    {name} : {count}
                </span>
            </li>
        </div>
    );
};

export default IconCard;