import { ImageResponse } from '@vercel/og';

export const runtime = "edge"
export const dynamicParams = true
export const revalidate = false

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'No title';
  const description = searchParams.get('description') || 'null';
  const cover = searchParams.get('cover');

  const coverUrl =
    cover &&
    `${new URL(req.url).protocol}//${new URL(req.url).host}/_next/image?url=${encodeURIComponent(
      cover
    )}&w=1200&q=75`;

  // console.log( coverUrl, title, description );
  return new ImageResponse(
    (
      <div
        style={{
          borderRadius: '8px',
          display: 'flex',
          width: '1200px',
          height: '628px',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          backgroundColor: '#e2e8f0',
        }}
      >
        {coverUrl && (
          <img
            src={coverUrl}
            alt="cover image"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        )}
        <div
          style={{
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px',
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '8px', fontWeight: 'bold' }}>
            {title}
          </div>
          <div style={{ fontSize: '24px', color: '#4a5568' }}>
            {description}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 628 }
  );
}