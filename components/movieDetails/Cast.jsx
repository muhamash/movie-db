import Image from 'next/image';

export default async function Cast ( { cast } )
{
    const castData = await cast;

    return (
        <div className="mb-6 w-full">
            <h3 className="text-gray-400 mb-2">Cast</h3>
            <div className="flex flex-wrap gap-4 font-nunito h-[250px] overflow-y-scroll">
                { castData?.castData?.cast.map( ( cst, index ) => (
                    <div key={ index } className="text-center">
                        <Image
                            width={ 400 }
                            height={ 300 }
                            src={
                                cst.profile_path
                                    ? `https://image.tmdb.org/t/p/original${cst.profile_path}`
                                    : '/assets/man.svg'
                            }
                            alt={ `${cast.name}` }
                            className="w-24 h-24 rounded-full object-cover mb-2"
                        />
                        <p className="text-sm">{ cst?.name }</p>
                    </div>
                ) ) }
            </div>
        </div>
    );
}
