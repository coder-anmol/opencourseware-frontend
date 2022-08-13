import UserDashboard from "@/components/Dashboard/user";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import Axios from "utils/fetcher";
import useStore from "store";
import swal from "sweetalert";
import { useRouter } from "next/router";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState({
        loading: true,
        userEnrollments: [],
        categories: [],
        currentCourse: {
            visible: false,
            course: null,
        },
    });
    const userData = useStore((state) => state.userData);
    const router = useRouter();

    useEffect(() => {
        Axios.get("course-enroll/current-student-all/")
            .then((res) => {
                const enrollments = res.data.results.reverse();
                Axios.get("category/all/").then((res) => {
                    const categories = res.data.results;

                    if (!!userData.history) {
                        const history = enrollments.filter(
                            (enrollment) =>
                                enrollment.course[0].id ==
                                userData.history.lastWatchedCourse
                        );
                        const lastWatchedCourse = history[0];

                        setDashboard({
                            loading: false,
                            userEnrollments: enrollments,
                            categories: categories,
                            currentCourse: {
                                visible: true,
                                course: lastWatchedCourse,
                            },
                        });
                    } else {
                        setDashboard({
                            loading: false,
                            userEnrollments: enrollments,
                            categories: categories,
                            currentCourse: {
                                visible: false,
                                course: null,
                            },
                        });
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                swal({
                    icon: "error",
                    title: "Error !!",
                    text: "Unable to fetch data",
                });
                router.push("/");
            });
    }, []);

    return (
        <>
            <Loader isLoading={dashboard.loading} />
            {!dashboard.loading && userData && (
                <UserDashboard
                    enrollments={dashboard.userEnrollments}
                    user={userData}
                    categories={dashboard.categories}
                    currentCourse={dashboard.currentCourse}
                />
            )}
        </>
    );
};

Dashboard.layout = "dashboard";
export default Dashboard;
