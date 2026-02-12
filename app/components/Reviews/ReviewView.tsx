

export default function ReviewView(
  { category, slug }: { category: string; slug: string }
) {

  return (
    <div>
      <h1>Review View Page</h1>
      <div>category: {category} - slug: {slug}</div>
    </div>
  )
}