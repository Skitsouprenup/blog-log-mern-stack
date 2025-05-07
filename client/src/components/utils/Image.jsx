import { IKImage } from 'imagekitio-react';

const Image = ({className='', alt='image', width, height, src}) => {
    const urlEndPoint = import.meta.env.VITE_IMGKIT_URL_ENDPOINT

    return (
        <IKImage
            urlEndpoint={urlEndPoint}
            className={className}
            src={src}
            alt={alt}
            lqip={{ active:true, quality: 20 }}
            loading="lazy"
            width={width}
            height={height}
            transformation={[
                {
                    width,
                    height
                }
            ]}
        />
    )
}

export default Image