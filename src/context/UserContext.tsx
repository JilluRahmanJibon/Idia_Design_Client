// context/UserContext.tsx
import React, { createContext, useContext, useState } from "react";

type TUser = {
    _id: string;
	userName: string;
	email: string;
	password: string;
	phone: string;
	profileImg: string | null;
	role: "user" | "superAdmin";
	isDeleted: boolean;
	status: "in-progress";
	createdAt: string;
	updatedAt: string;
	token:string
} | null;

type TUserContextType = {
	user: TUser;
	setUser: React.Dispatch<React.SetStateAction<TUser>>;
};

const UserContext = createContext<TUserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<TUser>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): TUserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
