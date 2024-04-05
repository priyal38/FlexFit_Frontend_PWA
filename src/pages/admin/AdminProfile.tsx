import React from 'react'
import Profile from '../../components/dashboard/profile/Profile'

type Props = {}

const AdminProfile = (props: Props) => {
  return (
    <div>
      <Profile isAdmin={true} />
    </div>
  )
}

export default AdminProfile