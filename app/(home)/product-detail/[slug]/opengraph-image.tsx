// "use client"

import { ImageResponse } from 'next/og'
import { BASE_URL } from '../../../../constant/Path'
 
// Image metadata
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image({ params }: { params: { slug: string } }) 
{
  // const url: string = `${BASE_URL}detail/${params?.slug}`
  // const data = await fetch(url)
  // const posts = await data.json()
 
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Great */}
        {/* {`${data?.['face_image']}`} */}
        <img width={800} height={800} src='https://eu2.contabostorage.com/531567a74f5740769e7b8d34e116cadd:autohub//aa/2025-04-16-advert-image-autohub-image67ffcb70149d5-100.jpg' />
      </div>
    )
  )
}