
type AuthErrorPageProps = { 
  message: string 
}

export default function AuthErrorPage({ 
  message 
}: AuthErrorPageProps) {
  const handleOpenLoginForm = () => {
    const loginLinkRef = document.getElementById("loginLinkRef")
    if (loginLinkRef) loginLinkRef.click()
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Sign-in Error</h1>
      <p className="mt-4 text-sm text-gray-600">{message}</p>

      <a
        href="#"
        className="mt-6 inline-block rounded bg-black px-4 py-2 text-white"
        onClick={handleOpenLoginForm}
      >
        Back to sign in
      </a>
    </main>
  )
}