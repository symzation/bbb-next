import { headers } from 'next/headers'
import BlogList from "@/components/Blog/BlogList"

export default async function Reviews() {
  const pathname = (await headers()).get('x-current-pathname')
  console.log('Current pathname:', pathname?.replace('/', ''))

  return (
    <div className="flex flex-col">
      <BlogList count={20} />
    </div>
  )
}
