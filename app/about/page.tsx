import { Metadata } from "next"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"

export const metadata: Metadata = {
  title: 'About',
  description: `Learn about our passion for fine spirits, craft beers, wines, coffees, and great food. Discover the story behind our honest reviews and immersive storytelling at ${process.env.NEXT_PUBLIC_SITENAME}.`,
}

export default function AboutPage() {
  return (
    <div className={cn(styles.pageClass)}>
      <h1 className={styles.pageHeading}>About Us</h1>
      <p className={styles.paragraph}>
        {`${process.env.NEXT_PUBLIC_SITENAME} is where craftsmanship, flavor, and story come together. We explore the world bourbon, coffee and craft beers celebrating the artistry and passion that go into every pour. From the smooth depth of a well-aged bourbon to the bold aroma of a fresh roast we bring each experience to life through honest reviews and immersive storytelling.`}
      </p>
      <p className={styles.paragraph}>
        {`Our goal is simple — to share our love for the craft and connect a community of curious palates. Whether you&apos;re a seasoned connoisseur or just beginning to explore, ${process.env.NEXT_PUBLIC_SITENAME} offers a welcoming space to discover new favorites and appreciate the details that make every tasting memorable. So pull up a chair, pour yourself something special, and join us as we sip, savor, and share the journey together.`}
      </p>
      <p className={styles.paragraph}>
        So, cheers to great flavors, good company, and the stories that unfold with every pour and sip. 
      </p>
    </div>
  )
}  

//Welcome to Bourbon Brew & Bites — where every sip tells a story.