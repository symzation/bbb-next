
export async function createUsername(email: string) {
  if (!email || email === "") return ""
  const randomString = Math.random().toString(36).substring(4, 12)
  const emailSplit = email.split("@")
  return `${emailSplit[0]}_${randomString}`
}

export function formatCamelCaseString(str: string) {
  return str.replace(/([A-Z])/g, ' $1').trim()
}

export async function getImageDimensions(file: File) {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight })
    }

    img.onerror = () => {
      reject({ error: "Could not load image." })
    }

    img.src = URL.createObjectURL(file)
  })
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min) // Ensure min is an integer
  max = Math.floor(max) // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function observeElementScroll(
  elementId: string, 
  callback: (values: { height: number, scrollY: number }) => void
) {
  const element = document.querySelector(`#${elementId}`) as HTMLElement 

  if (!element) {
    throw new Error(`Element with ID ${elementId} not found.`)
  }

  const values = {
    height: element.offsetHeight,
    scrollY: element.scrollTop,
  }

  const scrollObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      values.height = (entry.target as HTMLElement).offsetHeight
      values.scrollY = (entry.target as HTMLElement).scrollTop
      console.log("Element scrolled:", values)
      // You can return or use these dimensions as needed
      if (typeof callback === "function") callback(values)
    }
  })

  scrollObserver.observe(element)
  return values // Return initial dimensions
}

export function observeElementResize(elementId: string) {
  const element = document.querySelector(`#${elementId}`) as HTMLElement 

  if (!element) {
    throw new Error(`Element with ID ${elementId} not found.`)
  }

  const dimensions = {
    width: element.clientWidth,
    height: element.clientHeight,
  }

  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      dimensions.width = entry.contentRect.width
      dimensions.height = entry.contentRect.height
      console.log("Element resized:", entry.target, dimensions)
      // You can return or use these dimensions as needed
    }
  })

  resizeObserver.observe(element)
  return dimensions // Return initial dimensions
}

export function setupWindowObservers(
  callback: (values: { innerWidth: number; innerHeight: number; scrollY: number }) => void
) {
  let values

  if (typeof window === 'undefined') {
    values = { innerWidth: 0, innerHeight: 0, scrollY: 0 }
  } else {
    values = {
      innerWidth: window.innerWidth ?? 0,
      innerHeight: window.innerHeight ?? 0,
      scrollY: window.scrollY ?? 0,
    }
  }

  const updateValues = () => {
    values.innerWidth = window.innerWidth
    values.innerHeight = window.innerHeight
    values.scrollY = window.scrollY
    //console.log("Current values:", values)
    // You can also return or pass these values to another function
    // For example, if you have a state management system, you could dispatch an action here.
    if (typeof callback === "function") callback(values)
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateValues)
    window.addEventListener('scroll', updateValues)
  }

  // Return the initial values object
  return values
}

export function validateBio(bio: string) {
  const bioRegEx = /^[a-zA-Z0-9\s.,!?'"-]+$/
  return bioRegEx.test(bio)
}

export function validatePenName(penName: string) {
  const minLength = Number(process.env.NEXT_PUBLIC_USERNAME_LENGTH_MIN) || 3
  const maxLength = Number(process.env.NEXT_PUBLIC_USERNAME_LENGTH_MAX) || 32
  const penNameRegEx = /^(?!.*\s{2,})[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*\.?(?:\s+[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*\.?)*$/
  return penNameRegEx.test(penName) && penName.length >= minLength && penName.length <= maxLength
}

export function validateUsername(username: string) {
  const minLength = Number(process.env.NEXT_PUBLIC_USERNAME_LENGTH_MIN) || 3
  const maxLength = Number(process.env.NEXT_PUBLIC_USERNAME_LENGTH_MAX) || 32
  const usernameRegEx = new RegExp(`^[A-Za-z0-9_]{${minLength},${maxLength}}$`)
  return usernameRegEx.test(username) && username.length >= minLength && username.length <= maxLength
}
