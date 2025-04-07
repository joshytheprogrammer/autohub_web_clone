const URL = 
{
    offline: {
        path: process.env.URL,
        image_path: process.env.CLOUD_BASE_URL,
        status: true
    },
    online: {
        path: process.env.URL, 
        image_path: process.env.CLOUD_BASE_URL,
        status: false
    },
    asset: process.env.CLOUD_BASE_URL,
    connectTo: 'offline'
}

const DESTINATION = (URL.connectTo === 'offline') ? URL.offline.path : URL.online.path
const ASSET = URL.asset

export const BASE_URL = `${DESTINATION}/api/`;
export const BASE_IMG_URL = `${DESTINATION}/`;
export const ASSET_URL = `${ASSET}`;
export const CLOUD_BASE_URL = URL.offline.image_path;

export const USAGE_PATH = 
{
    BASE_URL_FRONT : `${DESTINATION}blog-detail/`,
    IMAGE_SLIDER : `${ASSET_URL}product/`, 
    PRODUCT_FACE : `${ASSET_URL}product/`,
    AVATAR : `${ASSET_URL}profile_picture/`,
    WATER_MARK : `${BASE_IMG_URL}constant/water/`,
    BLOG_POST : `${ASSET_URL}posts/`,
    RECEIPT : `${ASSET_URL}receipt/`,
    DEFAULT_AVATAR : `${ASSET_URL}constant/`
}

// export const USAGE_PATH = 
// {
//     CLOUD_BASE_URL_FRONT : `${DESTINATION}autohub/autohub/blog-detail/`,
//     CLOUD_IMAGE_SLIDER : `${CLOUD_BASE_URL}autohub/autohub/product/`, 
//     CLOUD_PRODUCT_FACE : `${CLOUD_BASE_URL}autohub/autohub/product/`,
//     CLOUD_AVATAR : `${CLOUD_BASE_URL}autohub/autohub/profile_picture/`,
//     CLOUD_WATER_MARK : `${CLOUD_BASE_URL}autohub/autohub/constant/water/`,
//     CLOUD_BLOG_POST : `${CLOUD_BASE_URL}autohub/autohub/posts/`,
//     CLOUD_RECEIPT : `${CLOUD_BASE_URL}autohub/autohub/receipt/`,
//     CLOUD_DEFAULT_AVATAR : `${CLOUD_BASE_URL}autohub/autohub/constant/`,
// }





