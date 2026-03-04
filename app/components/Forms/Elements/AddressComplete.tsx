
import { useEffect, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { useLoadScript, type Libraries } from '@react-google-maps/api'
import { Link } from "lucide-react"

const libraries: Libraries = ['places']

async function getMapsKeyCode() {
  return process.env.GOOGLE_MAPS_API_KEYCODE
}

export default function AddressAutocomplete() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey ?? "",
    libraries,
  })

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'us' }, // Optional: restrict to a specific country
    },
    debounce: 300,
  })

  useEffect(() => {
    const fetchApiKey = async () => {
      const key = await getMapsKeyCode()
      setApiKey(key ?? null)
    }
    fetchApiKey()
  }, [])

  if (!apiKey) return <div>Missing Google Maps API key</div>


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSelect = async (address: any) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const latLng = await getLatLng(results[0])
      console.log('Selected address coordinates:', latLng)
      // You can now use these coordinates, e.g., to display on a map
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading Maps API...</div>

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter an address"
        className={cn(styles.formInput, 'p-[4px]')}
      />
      {status === 'OK' && (
        <ul className="list-none p-0 m-0">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              className={cn('p-[4px] cursor-pointer border-b border-gray-300')}
            >
              <Link className="inline-block mr-1.5 text-lg text-secondary no-underline hover:no-underline">
                {description}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
