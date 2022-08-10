import moment from "moment";

// date formatter
export function formatDate(inputDate) {
    return moment(inputDate).format("L");
}

// role formatter
export function formatRole(isStudent, isTeacher, isAdmin) {
    if (isAdmin) return "Admin";
    if (isTeacher) return "Teacher";
    if (isStudent) return "Student";
}

// course name formatter
export function formatCourseName(name, length) {
    if (name.length <= length) return name;
    return name.substring(0, length) + "...";
}
