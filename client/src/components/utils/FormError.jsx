const FormError = ({formError, setFormError}) => {
  return (
    <>
        {
          formError && (
            <div className='p-[1rem] bg-red-500 text-gray-200 flex gap-x-[0.75rem] rounded-xl'>
              <p className='flex-1'>{formError}</p>
              <button type='button' onClick={() => setFormError('')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="hover:fill-amber-500 cursor-pointer bi bi-x-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                  </svg>
                </button>
            </div>
          )
        }
    </>
  )
}

export default FormError