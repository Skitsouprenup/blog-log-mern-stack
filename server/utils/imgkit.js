import ImageKit from "imagekit";

const imgKit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY
})

export const uploadPostCoverImg = async (imgBase64, user_id, post_id) => {
  const response = await imgKit.upload({
    file:imgBase64,
    fileName: `${user_id}-${post_id}`
  })

  return response
}