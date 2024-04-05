import React from 'react';
import { AdminMenuItems } from '../utils/MenuItems';
import { Route , Routes } from 'react-router-dom';
import Navbar from '../components/dashboard/common/Navbar/Navbar';
import Sidebar from '../components/dashboard/common/Sidebar';
import { Suspense } from 'react';
import Loading from '../components/dashboard/common/Loading';





const AddBlog = React.lazy(()=>import("../pages/admin/addForms/AddBlog"))
const AddRecipes = React.lazy(()=>import("../pages/admin/addForms/AddRecipes"))
const AddWorkout = React.lazy(()=>import("../pages/admin/addForms/AddWorkout"))
const AdminHome = React.lazy(()=>import("../pages/admin/AdminHome"))
const AdminProfile = React.lazy(()=>import("../pages/admin/AdminProfile"))
const AllWorkouts = React.lazy(()=>import("../pages/admin/AllWorkouts"))
const AllBlogs = React.lazy(()=>import("../pages/admin/AllBlogs"))
const AllRecipes = React.lazy(()=>import("../pages/admin/AllRecipes"))
const UpdateWorkout = React.lazy(()=>import('../pages/admin/updateForms/UpdateWorkout'))
const  UpdateBlog= React.lazy(()=>import('../pages/admin/updateForms/UpdateBlog'))
const UpdateHealthyRecipes = React.lazy(()=>import('../pages/admin/updateForms/UpdateRecipe'))

const AdminDashboard = () => {
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
          menuItems = {AdminMenuItems} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Navbar  handleDrawerToggle={handleDrawerToggle} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Suspense fallback={<Loading/>}>
      <Routes>
      <Route path='/' element={<AdminHome/>} ></Route>
       <Route path="addworkout" element={<AddWorkout />} />
       <Route path="dashboard" element={<AdminHome />} />
        <Route path="addblog" element={<AddBlog />} />
        <Route path="addNutritionPlan" element={<AddRecipes />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="allworkout" element={<AllWorkouts />} />
        <Route path="allblog" element={<AllBlogs />} />
        <Route path="allhealthyrecipes" element={<AllRecipes />} />
        <Route path="allworkout/:id" element={<UpdateWorkout />} />
        <Route path="allblog/:id" element={<UpdateBlog />} />
        <Route path="allhealthyrecipes/:id" element={<UpdateHealthyRecipes />} />
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

export default AdminDashboard;


