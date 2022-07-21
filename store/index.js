import create from "zustand";

const getUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const user = JSON.parse(window.localStorage.getItem("user"));
        return user;
    }
    return null;
};

const setUserInLocalStorage = (user) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem("user", JSON.stringify(user));
    }
};

const removeUserInLocalStorage = () => {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
    }
};

const doesUserExists = (user) => {
    return user ? true : false;
};

export const checkRole = (user, role) => {
    if (user.is_admin && role == "admin") {
        return true;
    } else if (user.is_student && role == "student") {
        return true;
    } else if (user.is_teacher && role == "teacher") {
        return true;
    } else {
        return false;
    }
};

const useStore = create((set) => ({
    // initially get user auth info from local storage
    user: getUserFromLocalStorage(),
    userData: null,

    setUser: (user) => {
        // set user in local storage
        setUserInLocalStorage(user);

        set((state) => {
            return { ...state, user: user };
        });
    },

    setUserData: (data) => {
        set((state) => ({ ...state, userData: data }));
    },

    logoutUser: () => {
        removeUserInLocalStorage();
        set((state) => ({ ...state, user: null }));
    },
}));

export default useStore;
