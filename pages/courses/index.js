import Courses from "@/components/Courses";
import TeacherProfile from "@/components/Teacher";
import Axios from "utils/fetcher";

const CoursesPage = ({ categories, courses }) => {
    return (
        <>
            <Courses categories={categories} courses={courses} />
            {/* <TeacherProfile /> */}
        </>
    );
};

export async function getStaticProps(context) {
    const categories = await Axios.get("category/all/");
    const categoriesData = await categories.data.results;

    const courses = await Axios.get("course/all-published/");
    const coursesData = await courses.data.results;

    return {
        props: {
            categories: categoriesData,
            courses: coursesData.reverse(),
        },
        revalidate: 7200,
    };
}

export default CoursesPage;
