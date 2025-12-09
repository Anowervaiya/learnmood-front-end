"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../../../../../ph-health-care/src/components/ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
