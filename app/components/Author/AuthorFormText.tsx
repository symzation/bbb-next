import { styles } from "@/utils/constants"
import { cn } from "@/utils"

export default function AuthorFormText() {
  return (
    <div className="pb-6">
      <h1 className="text-3xl font-bold mb-4">Want To Become A Reviewer?</h1>
      <p className={styles.paragraph}>
        Becoming a reviewer for Bourbon Brew & Bites is easier than pouring your first glass. With just a few simple steps, you can join a growing community of enthusiasts who share their love for bourbon, beer, coffee, and delicious small bites from around the country. Whether you're a seasoned taster or someone who simply enjoys a great pour and good company, your voice matters. The process is designed to be effortless — sign up, create your reviewer profile, and start writing reviews about your favorite local spots, distilleries, breweries, coffee shops, or hidden gems in your city or state.
      </p>
      <p className={styles.paragraph}>
        As a reviewer, you&apos;ll have the chance to spotlight the rich flavors, craftsmanship, and atmosphere that make your local experiences unique. Share tasting notes, personal stories, or recommendations that help others discover the best sips and bites near them. Each review adds value to the community — guiding newcomers, highlighting local businesses, and celebrating the artistry behind every roast, brew, and pour. And it is eay with just a few easy steps.
      </p>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-center items-center mt-3">
          <div className="text-center md:text-left font-bold text-8xl max-w-full md:max-w-12 mr-0 md:mr-8.5">
            1
          </div> 
          <div className="text-2xl text-center font-bold rotate-0 md:rotate-90 max-w-full md:max-w-20">Apply</div>
          <p className={cn(styles.paragraph)}>
            Fill out the application form below to become a reviewer. Register below to create your reviewer profile and start sharing your love for bourbon, brew, bites, and all the local gems in between.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-3">
          <div className="text-center md:text-left font-bold text-8xl max-w-full md:max-w-12 mr-0 md:mr-4">
            2
          </div> 
          <div className="text-2xl text-center font-bold rotate-0 md:rotate-90 max-w-full md:max-w-20">Review</div>
          <p className={cn(styles.paragraph)}>
            Our team members will review your application. You will be notified of the outcome.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-3">
          <div className="text-center md:text-left font-bold text-8xl max-w-full md:max-w-12 mr-0 md:mr-5.5">
            3
          </div> 
          <div className="text-2xl text-center font-bold rotate-0 md:rotate-90 max-w-full md:max-w-20">Write</div>
          <p className={cn(styles.paragraph, "pl-0 md:pl-2")}>
            Once approved you can start writing reviews about your experiences — whether it&apos;s a new distillery you visited, a coffee shop that serves the perfect cup, or a restaurant with an unforgettable pairing. Your insights and stories will help others discover the best spots in their area.
          </p>
        </div> 
      </div>
      <p className={styles.paragraph}>
        Ready to share your unique experiences with a community eager to discover new flavors? Let your tastebuds tell the story—your journey as a reviewer begins below.
      </p>
    </div>
  )
}