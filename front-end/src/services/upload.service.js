

export const uploadService = {
  uploadImg
}


async function uploadImg(ev) {
  const CLOUD_NAME = "dimirmc9j"
  const UPLOAD_PRESET = "mister_toy"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('file', ev.target.files[0])
  formData.append('upload_preset', UPLOAD_PRESET)

  try{
    const res = await fetch(UPLOAD_URL, {method: 'POST',body: formData})
    // const elImg = document.createElement('img');
    console.log('res:',res)
    const { url } = await res.json()
    // elImg.src = url
    // document.body.append(elImg)
    return url
   

  }catch(err){
    console.error(err)
  }
    
}
