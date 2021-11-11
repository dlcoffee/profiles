import { supabase } from '../../lib/supabase'

export default function handler(req, res) {
  console.log('@@@@ api/auth', req.body)
  supabase.auth.api.setAuthCookie(req, res)
}
