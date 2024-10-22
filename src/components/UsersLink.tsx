"use client";
import React from "react";
import Link from "next/link";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const UsersLink: React.FC = () => {
  const userData = useAppSelector(
    (state: RootState) => state.authReducer?.userData
  );

  return (
    <>
      {userData?.permissions?.includes("view user") && (
        <Link className="btn btn-outline-info mt-3" href="/users">
          Go to users
        </Link>
      )}
    </>
  );
};

export default UsersLink;
