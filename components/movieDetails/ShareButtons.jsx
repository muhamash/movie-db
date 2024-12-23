'use client';

import
    {
        FacebookIcon,
        FacebookShareButton,
        LinkedinIcon,
        LinkedinShareButton,
        PinterestIcon,
        PinterestShareButton,
        TwitterIcon,
        TwitterShareButton
    } from 'react-share';

export default function ShareButtons({  userId, movieId }) {

    const url = `${process.env.NEXT_PUBLIC_URL}/movie/${movieId}?userId=${userId ?? "notLoggedIn"}`;

    // console.log( url );
    return (
        <div className="share-buttons mb-6">
            <h3 className="text-gray-400 mb-2">Share on social media</h3>
            <div className="flex gap-4">
                <FacebookShareButton url={ url }>
                    <FacebookIcon size={ 32 } round />
                </FacebookShareButton>

                <TwitterShareButton url={ url } >
                    <TwitterIcon size={ 32 } round />
                </TwitterShareButton>

                <LinkedinShareButton url={ url } >
                    <LinkedinIcon size={ 32 } round />
                </LinkedinShareButton>

                <PinterestShareButton url={ url } >
                    <PinterestIcon size={ 32 } round />
                </PinterestShareButton>
            </div>
        </div>
    );
}