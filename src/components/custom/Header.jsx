import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <header className="px-5 py-3 flex justify-between shadow-md">
      <img src="/logo.svg" alt="logo" width={100} height={100} />
      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </header>
  );
}

export default Header;
