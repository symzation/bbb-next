import { headers } from 'next/headers'
import Rankings from "@/components/Rankings/Rankings"

export default async function Reviews() {
  const headerList = await headers();
  const pathname = headerList.get('x-current-pathname');
  console.log('Current pathname:', pathname?.replace('/', ''))

  return (
    <div className="flex flex-col">
      <Rankings />
    </div>
  )
}
