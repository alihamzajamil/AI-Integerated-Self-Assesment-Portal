"use client";
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser, useUserStore } from '@/store/useUserStore';
import Analytics from '../dashboardFeatures/Analytics';

const ProfileContent = () => {
  const { user } = useUser();
  const {
    updateUserProfile,
    updateUserErrorMessage,
    updateUserSuccessMessage,
    updateUserLoading,
    changePassword, 
    changePasswordLoading,
    changePasswordErrorMessage,
    changePasswordSuccessMessage
  } = useUserStore();

  const [profileData, setProfileData] = useState({
    fullName: '',
    userName: '',
    email: '',
    educationLevel: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        userName: user.userName || '',
        email: user.email || '',
        educationLevel: user.educationLevel || '',
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user._id) {
      await updateUserProfile(profileData);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
      await changePassword(passwordData);
      
    
  };

  return (
    <>
    
        <Analytics/>
      
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Profile</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
                <Input
                  name="fullName"
                  placeholder="Full Name"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                />
                <Input
                  name="userName"
                  placeholder="User Name"
                  value={profileData.userName}
                  onChange={handleProfileChange}
                />
                <Input
                  name="email"
                  placeholder="Email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                />
                <Input
                  name="educationLevel"
                  placeholder="Education Level"
                  value={profileData.educationLevel}
                  onChange={handleProfileChange}
                />
              </form>
              {updateUserSuccessMessage && (
                <div className="text-green-500 mt-2">
                  {updateUserSuccessMessage}
                </div>
              )}
              {updateUserErrorMessage && (
                <div className="text-red-500 mt-2">
                  {updateUserErrorMessage}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button className='bg-black text-white' onClick={handleProfileSubmit} disabled={updateUserLoading}>
                {updateUserLoading ? "loading..." : "Save"}
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </form>
              {changePasswordSuccessMessage && (
                <div className="text-green-500 mt-2">
                  {changePasswordSuccessMessage}
                </div>
              )}
              {changePasswordErrorMessage && (
                <div className="text-red-500 mt-2">
                  {changePasswordErrorMessage}
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button className='bg-black text-white' onClick={handlePasswordSubmit} disabled={changePasswordLoading}>{changePasswordLoading ? 'loading...' : 'Change Password'}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
