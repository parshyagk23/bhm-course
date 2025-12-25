import React, { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { getAllCourses, getCoursesByCategory } from "../services/course";
import SortDropdown from "../UI/Dropdown";

const Store = () => {
  const [activeCategory, setActiveCategory] = useState("ALL COURSES");
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "All Courses",
    "Popular Courses",
    "Free Ai Course",
    "Structural",
    "Geotech",
    "Architectural",
    "Construction",
    "FE",
    "BIM",
    "Workshop",
    "Mechanical",
  ];

  // 🔹 Fetch courses
  const fetchCourses = async (category) => {
    setLoading(true);
    try {
      let res;

      if (category === "ALL COURSES") {
        res = await getAllCourses();
      } else {
        res = await getCoursesByCategory(category);
      }

      // ✅ FIX HERE
      setCourses(res.courses ?? []);
    } catch (error) {
      console.error("Failed to load courses", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCourses(activeCategory);
  }, [activeCategory]);

  // 🔹 Search filter (frontend)
  const filteredCourses = courses.filter((course) =>
    course?.courseName.toLowerCase().includes(search.toLowerCase())
  );

  const sortCourses = (type) => {
    let sorted = [...courses];

    if (type === "Newest First") {
      sorted.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (type === "Oldest First") {
      sorted.sort((a, b) => a.createdAt - b.createdAt);
    }

    setCourses(sorted);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-72 space-y-8 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-2 space-y-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full px-4 py-3.5 rounded-xl text-sm font-bold uppercase transition-all
                  ${activeCategory === cat
                    ? "border-2 border-[#0D2A4A] text-[#0D2A4A]"
                    : "border-2 border-transparent text-[#0D2A4A] hover:bg-slate-50"
                  }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="p-6 bg-[#0D2A4A] rounded-2xl text-white space-y-4">
            <h4 className="font-bold">Need Help?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">Not sure which course is right for you? Talk to our career counselors.</p>
            <button className="w-full py-2 bg-[#F9A825] text-[#0D2A4A] rounded-lg text-sm font-bold hover:bg-yellow-400 transition-all">
              Call Now
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 space-y-8">
          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search for courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-white border rounded-2xl focus:ring-2 focus:ring-[#2D61A1]"
              />
            </div>

            <SortDropdown
              onChange={sortCourses}
            />
          </div>

          {/* Courses */}
          {loading ? (
            <p className="text-center text-slate-500">Loading courses...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.courseId}
                  course={course}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Store;
