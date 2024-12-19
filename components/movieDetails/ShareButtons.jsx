'use client';

import Head from "next/head";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ShareButtons({ title, description, image }) {
    const pathname = usePathname();
    const url = `https://movie-db-eight-sable.vercel.app/${pathname}`;

    const platforms = [
        {
            name: "Facebook",
            img: "http://facebook.com/favicon.ico",
            shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
            name: "X",
            img: "http://x.com/favicon.ico",
            shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        },
        {
            name: "LinkedIn",
            img: "http://linkedin.com/favicon.ico",
            shareUrl: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
        },
    ];

    useEffect( () =>
    {
        const metaTags = [
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:image", content: image },
            { property: "og:url", content: url },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: title },
            { name: "twitter:description", content: description },
            { name: "twitter:image", content: image },
        ];

        metaTags.forEach( ( { property, name, content } ) =>
        {
            let metaTag = document.querySelector( `meta[${property ? `property="${property}"` : `name="${name}"`}]` );
            if ( !metaTag )
            {
                metaTag = document.createElement( 'meta' );
                if ( property )
                {
                    metaTag.setAttribute( 'property', property );
                } else
                {
                    metaTag.setAttribute( 'name', name );
                }
                document.head.appendChild( metaTag );
            }
            metaTag.setAttribute( 'content', content );
        } );

    }, [ title, description, image, url ] );

    return (
        <>
            <Head>
                <title>{ title }</title>
            </Head>
            <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <div className="flex gap-4 font-manrope">
                    { platforms.map( ( platform, index ) => (
                        <a
                            key={ index }
                            href={ platform.shareUrl }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center cursor-pointer"
                        >
                            <Image
                                width={ 400 }
                                height={ 300 }
                                src={ platform.img }
                                alt={ platform.name }
                                className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                            />
                        </a>
                    ) ) }
                </div>
            </div>
        </>
    );
}