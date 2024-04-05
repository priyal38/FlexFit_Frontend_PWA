import React from 'react';
import { Route , Routes } from 'react-router-dom';
import { UserMenuItems } from '../utils/MenuItems';
import Navbar from '../components/dashboard/common/Navbar/Navbar';
import Sidebar from '../components/dashboard/common/Sidebar';
import { Suspense } from 'react';
import Loading from '../components/dashboard/common/Loading';




const Workoutpage = React.lazy(()=> import("../pages/user/workout/Workoutpage"))
const RecipePage = React.lazy(()=> import("../pages/user/recipe/RecipePage"))
const UserProfile = React.lazy(()=> import('../pages/user/profile/UserProfile'))
const BlogPage = React.lazy(()=> import("../pages/user/blog/BlogPage"))
const UserHome = React.lazy(()=> import("../pages/user/userDashboard/UserHome"))
const BlogDetails  = React.lazy(()=> import("../pages/user/blog/BlogDetails"))
const RecipeDetails =React.lazy(()=>import("../pages/user/recipe/RecipeDetails"))
const WorkoutDetailsPage = React.lazy(()=>import('../pages/user/workout/WorkoutDetails'))



const UserDashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  
  const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    
  };

  return (
    <>
    
  
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar  mobileOpen={mobileOpen}
          handleDrawerClose={handleDrawerClose}
          menuItems = {UserMenuItems} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Navbar  handleDrawerToggle={handleDrawerToggle} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-surface-100">
            <Suspense fallback = {<Loading/>} >
         <Routes>
          <Route path='/' element={<UserHome/>} ></Route>
       <Route path="home" element={<UserHome />} />
        <Route path="workout" element={<Workoutpage />} />
        <Route path="healthyrecipes" element={<RecipePage />} />
        <Route path="profile" element={<UserProfile/>} />
        <Route path="workout/:id" element={<WorkoutDetailsPage />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="healthyrecipes/:id" element={<RecipeDetails />} />
        <Route path="blog" element={<BlogPage/>} />
        </Routes>
        </Suspense>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    
    </>
  );
};

export default UserDashboard;

