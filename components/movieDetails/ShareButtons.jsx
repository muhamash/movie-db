'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';
import
    {
        FacebookIcon,
        FacebookShareButton,
        LinkedinIcon,
        LinkedinShareButton,
        PinterestIcon,
        PinterestShareButton,
        RedditIcon,
        RedditShareButton,
        TelegramIcon,
        TelegramShareButton,
        TwitterIcon,
        TwitterShareButton,
        WhatsappIcon,
        WhatsappShareButton,
    } from 'react-share';

export default function ShareButtons({ title, description, image }) {
    const pathname = usePathname();
    const url = `https://movie-db-eight-sable.vercel.app${pathname}`;

    const ogImageUrl = `https://movie-db-eight-sable.vercel.app/api/og?title=${encodeURIComponent(
        title
    )}&description=${encodeURIComponent( description )}&cover=${encodeURIComponent( image )}`;
    
    console.log(ogImageUrl);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="title" property="og:title" content={title} />
                <meta name="description" property="og:description" content={description} />
                <meta name="image" property="og:image" content={ogImageUrl} />
                <meta name="url" property="og:url" content={url} />
                <meta name="website" property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImageUrl} />
            </Head>
            <div className="share-buttons mb-6">
                <h3 className="text-gray-400 mb-2">Share on social media</h3>
                <div className="flex gap-4">
                    <FacebookShareButton url={url} quote={title}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <TwitterShareButton url={url} title={title}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>

                    <LinkedinShareButton url={url} title={title} summary={description}>
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>

                    <PinterestShareButton url={url} media={ogImageUrl} description={description}>
                        <PinterestIcon size={32} round />
                    </PinterestShareButton>

                    <RedditShareButton url={url} title={title}>
                        <RedditIcon size={32} round />
                    </RedditShareButton>

                    <TelegramShareButton url={url} title={title}>
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>

                    <WhatsappShareButton url={url} title={title} separator=":: ">
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div>
            </div>
        </>
    );
}