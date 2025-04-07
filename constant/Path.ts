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
    asset: process.env.ASTURL,
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
    CLOUD_BASE_URL_FRONT : `${DESTINATION}blog-detail/`,
    CLOUD_IMAGE_SLIDER : `${CLOUD_BASE_URL}product/`, 
    CLOUD_PRODUCT_FACE : `${CLOUD_BASE_URL}product/`,
    CLOUD_AVATAR : `${CLOUD_BASE_URL}profile_picture/`,
    CLOUD_WATER_MARK : `${CLOUD_BASE_URL}constant/water/`,
    CLOUD_BLOG_POST : `${CLOUD_BASE_URL}posts/`,
    CLOUD_RECEIPT : `${CLOUD_BASE_URL}receipt/`,
    CLOUD_DEFAULT_AVATAR : `${CLOUD_BASE_URL}constant/`,
}





