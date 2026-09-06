import { cn } from "@/utils"
import { styles } from "@/utils/constants"
import { ENUM_CHECK_STATE } from "@/types/enums"

type SearchInputStateProps = {
  state: ENUM_CHECK_STATE
}

export default function SearchInputState({ state }: SearchInputStateProps) {
  console.log("Search input state:", state)
  return (
    <>
      {state === ENUM_CHECK_STATE.IDLE && <></>}
      {state === ENUM_CHECK_STATE.INVALID && 
        <span className="text-sm text-error">- ⚠️ Invalid</span>
      }
      {state === ENUM_CHECK_STATE.CHECKING && 
        <span className="text-sm font-bold">- 🔍 Checking</span>
      }
      {state === ENUM_CHECK_STATE.AVAILABLE && 
        <span className="text-sm text-success">- ✅ Available</span>
      }
      {state === ENUM_CHECK_STATE.UNAVAILABLE && 
        <span className="text-sm text-error">- 🚫 Unavailable</span>
      }
      {state === ENUM_CHECK_STATE.TAKEN && 
        <span className="text-sm text-error">- ❌ Taken</span>
      }
      {state === ENUM_CHECK_STATE.ERROR && 
        <span className="text-sm text-error">- ‼️ Something went wrong. Try again.</span>
      }
    </>
  )
}