import { styles } from "@/constants/constants";

export default function NotAuthorized() {
  return (
    <div className={styles.pageClass}>
      <h1 className="text-3xl font-extrabold text-center mb-4">Not Authorized</h1>
      <p className="text-lg text-center text-muted-foreground">
        You do not have permission to access this page. Please log in to continue.
      </p>
    </div>
  )
}
