export const encodeImageFileAsURL = (e, setImg) => {
  const element = e.target
  const file = element.files[0];
  const reader = new FileReader();
  //Will be executed once readAsDataURL is done
  reader.onloadend = () => {
    const imgBase64 = reader.result.replace('data:image/jpeg;base64,', '')
    //console.log('RESULT', result)
    setImg({imgBase64, name: file.name})
  }
  reader.readAsDataURL(file);
}

export const trim_text = (text, threshold = 10, trim_ln = 7) => {
    if(threshold < 10) return text
    //-3 because three dots will replace the 
    // remaining three characters
    if(trim_ln >= (threshold-3)) return text

    const ln = text.length

   if(ln > threshold) return text.substring(0, trim_ln)+"..."

   return text
}

/* Used for debugging to compute what is the estimated size
 of a request */
export const getByteLength = (str) => {
  // Creating new Blob object and passing string into it 
  // inside square brackets and then 
  // by using size property storin the size 
  // inside the size variable
  let size = new Blob([str]).size;
  return size;
}

