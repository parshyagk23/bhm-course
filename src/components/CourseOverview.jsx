import { CheckCircle } from 'lucide-react'
import React from 'react'

const CourseOverview = ({ descriptionList }) => {
    return (
        <div>
            <h3 className="text-2xl sm:text-2xl font-black text-[#0D2A4A] tracking-tight mb-4">Course Description</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {descriptionList.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-start gap-2 text-slate-600"
                    >
                        <CheckCircle
                            size={18}
                            className="text-green-500 shrink-0 mt-0.5"
                        />
                        <span className="text-sm font-medium">{item}</span>
                    </div>
                ))}
            </div>
        </div>

    )
}


export default CourseOverview