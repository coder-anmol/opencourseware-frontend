// date formatter
export function formatDate(inputDate) {
    const myDate = new Date(inputDate);
    return `${myDate.toLocaleString("default", {
        weekday: "short",
    })}, ${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}`;
}

// role formatter
export function formatRole(isStudent, isTeacher, isAdmin) {
    if (isAdmin) return "Admin";
    if (isTeacher) return "Teacher";
    if (isStudent) return "Student";
}
