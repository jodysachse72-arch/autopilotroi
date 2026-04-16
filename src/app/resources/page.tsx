import { redirect } from 'next/navigation'

/* 
  The public /resources page has been moved into the authenticated
  partner dashboard at /dashboard/resources and admin panel at
  /admin/resources. Redirect any direct visits to the dashboard version.
*/
export default function ResourcesRedirect() {
  redirect('/dashboard/resources')
}
