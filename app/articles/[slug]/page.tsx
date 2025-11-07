import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { BlogPostPageProps } from "@/types/types"
import BlogPost from "@/components/Blog/BlogPost"

export default function ReviewPost({ 
  params 
}: BlogPostPageProps) {

  return (
    <div className="flex flex-col mt-10">
      <div className={cn(styles.pageClass, 'px-5 md:px-10')}>
        <BlogPost params={params} />
      </div>
    </div>
  )
}

