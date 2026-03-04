import type { Metadata } from "next";
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import AuthorFormText from "@/components/Author/AuthorFormText"
import AuthorForm from "@/components/Author/AuthorForm"

export const metadata: Metadata = {
  title: 'Become a Reviewer',
  description: `Learn how to become a reviewer for ${process.env.NEXT_PUBLIC_SITENAME} and share your unique experiences with our community.`,
}

export default function AuthorPage() {
  return (
    <div className={cn(styles.pageClass, "mx-4 md:mx-20")}>
      <AuthorFormText />
      <AuthorForm />  
    </div>
  )
}