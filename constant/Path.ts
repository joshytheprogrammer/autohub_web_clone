const URL = 
{
    offline: {
        path: process.env.URL, 
        status: true
    },
    online: {
        path: '', 
        status: false
    },
    connectTo: 'offline'
}

const DESTINATION = (URL.connectTo === 'offline') ? URL.offline.path : URL.online.path

export const BASE_URL = `${DESTINATION}api/`;

export const USAGE_PATH = 
{
    BASE_URL_FRONT : `${DESTINATION}blog-detail/`,
    IMAGE_SLIDER : `${DESTINATION}product/`, 
    PRODUCT_FACE : `${DESTINATION}product/`,
    AVATAR : `${DESTINATION}profile_picture/`,
    WATER_MARK : `${DESTINATION}water/`,
    BLOG_POST : `${DESTINATION}posts/`,
    RECEIPT : `${DESTINATION}receipt/`,
}



