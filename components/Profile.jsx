import { supabase } from '../lib/supabase'

export default function Profile() {
  const handleOnClick = async (evt) => {
    const { error } = await supabase.auth.signOut()
    console.log(error)
  }

  return (
    <div>
      <button onClick={handleOnClick}>log out</button>
    </div>
  )
}
