import Image from 'next/image'

export function ImageApp({ url, alt = 'YounetDigital', width = 50, height = 50 }: any) {
    return (
        <>
            <Image src={url} alt={alt} width={width} height={height} />
        </>
    )
}
