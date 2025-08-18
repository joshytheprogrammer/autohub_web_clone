import { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL } from "../../../../constant/Path"
import DisplayProduct from "./display"

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};


export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {

  let endPoint = `/api/detail/`
  let ApiUrl = `${process.env.URL}${endPoint}${params.slug}`
  const post = await fetch(ApiUrl).then((res) => res.json());

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post?.data?.product?.title,
    description: post?.data?.product?.manufacturer,
    openGraph: {
      images: [
        ...previousImages,
        {
          url: post?.data?.product?.face_image,
          alt: post?.data?.product?.title,
        },
      ],
    },
  };
}


export default function ProductDetail({ params } : { params : { slug: string } }) 
{   
    const url: string = params?.slug
    return <DisplayProduct url={url} />
}




