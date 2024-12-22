export default async function layout({children}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {children}
    </div>
  )
}
