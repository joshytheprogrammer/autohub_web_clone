import { Metadata, ResolvingMetadata } from 'next';
import { BASE_URL } from "../../../../constant/Path"
import DisplayProduct from "./display"

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch data based on params

  let endPoint = `detail/`
  let ApiUrl = `${BASE_URL}${endPoint}${params.slug}`
  const post = await fetch(ApiUrl).then((res) => res.json());
  // console.log(post?.data?.product?.face_image)

  // Optionally access and extend (or override) the parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  console.log(previousImages)

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


