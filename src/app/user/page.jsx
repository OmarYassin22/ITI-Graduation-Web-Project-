"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import Variants from "../Spinner";
import { useRouter } from "next/navigation";
import { BackgroundSection, CardGridSection } from "./StaticSections";
import { courseContext } from "../Contexts/Courses/CourseContextProvider";
import Acordion from "./acordion";

function UserPage() {
  const counter =
    localStorage.getItem("counter") == 0
      ? localStorage.setItem("counter", 0)
      : +localStorage.getItem("counter");
  console.log(counter);

  window.onload = () => {
    localStorage.setItem("counter", +localStorage.getItem("counter") + 1);
  };
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const { localCourse, setLocalCourse } = useContext(courseContext);

  console.log(courses);

  useEffect(() => {
    setCourses(localCourse);
  }, [localCourse]);

  useEffect(() => {
    if (courses.length > 0) {
      if (localCourse.length > 0) {
        setCourses((prevCourses) =>
          prevCourses.sort((a, b) =>
            (a.data.students?.length || 0) > (b.data.students?.length || 0)
              ? -1
              : (a.data.students?.length || 0) < (b.data.students?.length || 0)
              ? 1
              : 0
          )
        );
      }
    }
  }, []);

  return (
    <div className="container text-color mx-auto px-4">
      {/* Introduction Section */}
      <div className="my-14">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 m-auto">
          <div className="text w-full md:w-auto mt-10 ml-auto">
            <h2 className="text-xl">
              Grow Your Skills In{" "}
              <span className="text-blue-700 font-bold">Few Minutes</span>
            </h2>
            <p className="max-w-96">
              We are accredited with the Most Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Illum
            </p>
          </div>
          <div className="w-full md:w-auto mr-auto">
            <Image
              src="/images/13.jpg"
              className="border rounded-xl"
              alt="User"
              width={350}
              height={300}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <BackgroundSection />

      {/* Popular Courses Section */}
      <div className="my-20">
        <h2 className="font-bold text-4xl mb-5">Most Popular Courses</h2>
        <div className="cards-course text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {courses?.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  router.push(`/user/Courses/${course.id}`);
                }}
                className="relative w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat rounded-xl hover:scale-105 duration-500"
                style={{ backgroundImage: `url(${course.image})` }}
              >
                <div className="overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
                <div className="relative z-10 text-white">
                  <div className="card-content">
                    <h3 className="font-bold mb-2">{course.data.title}</h3>
                    <span className="flex justify-center items-center gap-x-3">
                      <FaStar className="text-yellow-400" />{" "}
                      <span>{course.data.rating}</span>
                    </span>{" "}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="max-h-full flex justify-between ">
              <Variants />
              <Variants />
              <Variants />
              <Variants />
            </div>
          )}
        </div>
      </div>
      <Acordion />
    </div>
  );
}

export default UserPage;
