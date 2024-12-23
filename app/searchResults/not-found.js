export default async function notFound() {
  return (
    <div className='w-full h-full flex flex-col gap-5 items-center justify-center text-md text-red-600'>
      <div className='notFoundLoader'></div>
      <p className='text-center'>Not Found</p>
    </div>
  )
}
