const URL = 
{
    offline: {
        path: process.env.URL,
        status: true
    },
    online: {
        path: process.env.URL, 
        status: false
    },
    connectTo: 'online'
}

const DESTINATION = (URL.connectTo === 'offline') ? URL.offline.path : URL.online.path

export const BASE_URL = `${DESTINATION}api/`;
export const ASSET_URL = `${DESTINATION}`;

export const USAGE_PATH = 
{
    BASE_URL_FRONT : `${DESTINATION}blog-detail/`,
    IMAGE_SLIDER : `${ASSET_URL}product/`, 
    PRODUCT_FACE : `${ASSET_URL}product/`,
    AVATAR : `${ASSET_URL}profile_picture/`,
    WATER_MARK : `${ASSET_URL}constant/water/`,
    BLOG_POST : `${ASSET_URL}posts/`,
    RECEIPT : `${ASSET_URL}receipt/`,
    DEFAULT_AVATAR : `${ASSET_URL}constant/`,
}



