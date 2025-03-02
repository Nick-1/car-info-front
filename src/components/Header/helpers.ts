export const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");

    location. reload();
}
