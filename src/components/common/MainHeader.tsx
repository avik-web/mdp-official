const MainHeader = ({ title, description}: {title: string; description?: string}) => {

    return (
        <div className="w-full h-[250px] md:h-[450px] bg-gray-200 overflow-hidden bg-[url('/assets/bungalow-bg.jpg')] bg-no-repeat bg-center bg-cover">
            <div className="max-w-7xl m-auto h-full flex items-center">
                <div className="text-black pl-5 sm:px-0 w-[70%]">
                    <h1 className="text-4xl md:text-6xl mb-2 font-bold ">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-black my-4 md:my-8 sm:text-lg md:text-xl mb-2">
                        {description}
                    </p>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
