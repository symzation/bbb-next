import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { useLoadScript, type Libraries } from '@react-google-maps/api'

const libraries: Libraries = ['places']

async function getMapsKeyCode() {
  return process.env.GOOGLE_MAPS_API_KEYCODE
}

export default async function AddressAutocomplete() {
  const apiKey = await getMapsKeyCode()

  if (!apiKey) return <div>Missing Google Maps API key</div>

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
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
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className={cn('p-[4px] cursor-pointer border-b border-gray-300')}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
