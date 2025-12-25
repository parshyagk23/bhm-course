import React from "react";
import { PlayCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  // 🔹 Map backend fields
  const title = course.courseName;
  const image = course.thumbnailUrl;
  const id = course.courseId;

  const sellingPrice = course.pricing?.sellingPrice ?? 0;
  const mrp = course.pricing?.mrp ?? 0;

  const discountPercentage =
    mrp > 0 ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

  const isFeatured = course.isFeatured;

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {isFeatured && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-[#F9A825] text-white text-[10px] font-bold rounded uppercase tracking-wider">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-2">
        <h3 className=" text-left font-bold text-slate-800 text-lg mb-3 line-clamp-2 h-14">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-slate-500 mb-5">
          <div className="flex items-center gap-1">
            <PlayCircle size={14} className="text-[#2D61A1]" />
            <span>0 VIDEOS</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText size={14} className="text-[#2D61A1]" />
            <span>0 FREE CONTENT</span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className=" flex flex-col items-start space-y-1">
            <div className="flex items-start gap-2">
              <span className="text-xl font-bold text-slate-900">
                ₹{sellingPrice.toLocaleString()}
              </span>

              {mrp > 0 && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{mrp.toLocaleString()}
                </span>
              )}
            </div>

            {discountPercentage > 0 && (
              <div className=" text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block">
                {discountPercentage}% OFF
              </div>
            )}
          </div>

          <Link
            to={`/course/${title?.replace(" ", "-")}`}
            className="px-4 py-2 bg-[#0D2A4A] text-white rounded-lg font-medium text-sm hover:bg-[#2D61A1] transition-colors"
          >
            Get the course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
