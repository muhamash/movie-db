'use client';

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
    } from 'next-share';
import { usePathname } from 'next/navigation';

export default function ShareButtons({ title, description, image }) {
    const pathname = usePathname();
    const url = `https://movie-db-eight-sable.vercel.app${pathname}`;
    const hashtags = ["#movieDB", "#movies", "#cinema"];

    return (
        <div className="share-buttons mb-6">
            <h3 className="text-gray-400 mb-2">Share on social media</h3>
            <div className="flex gap-4">
                <FacebookShareButton url={url} quote={title} hashtag={hashtags.join(" ")}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton url={url} title={title} hashtags={hashtags}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <LinkedinShareButton url={url} title={title} summary={description}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <PinterestShareButton url={url} media={image} description={description}>
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
    );
}