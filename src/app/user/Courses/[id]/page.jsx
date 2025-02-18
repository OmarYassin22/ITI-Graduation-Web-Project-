"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import "./CoursePage.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
// import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import { courseContext } from "../../../Contexts/Courses/CourseContextProvider";
import Variants from "../../../Spinner";
import Image from "next/image";
import DefaultLayout from "../../../../components/homeComponents/Layouts/DefaultLayout";
import Swal from "sweetalert2";
import "./CoursePage.css";
const Page = ({ params }) => {
  const [courses, setCourses] = useState();
  const [comments, setComments] = useState("");
  const { push } = useRouter();
  const [cTitle, setCTitle] = useState("");
  const [cPrice, setCPrice] = useState(0);
  const [cImage, setCImage] = useState("");
  const [cDetails, setCDetails] = useState("");
  const [cInstructor, setCInstructor] = useState("");
  const [result, setResult] = useState(null);
  const { localCourse, setLocalCourse } = useContext(courseContext);

  /////////////////////////////////

  useEffect(() => {
    const fetchData = async () => {
      try {
        localCourse?.map((c) => (c.id == params.id ? setResult(c) : null));
        console.log(result);
        if (result) {
          setCTitle(result.data.title);
          setCPrice(parseInt(result.data.price));
          setCDetails(result.data.details);
          setCImage(result.data.cImage);
          setCInstructor(result.data.instructor);
          setComments(result.data.coments); // Fix typo: changed 'coments' to 'comments'
          setCourses(result);

          console.log(localCourse);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [courses, localCourse, params.id, result]);
  ////////////////////////////////

  console.log(comments);
  function mustLogin() {
    Swal.fire({
      position: "center-center",
      icon: "error",
      title: "You must login first",
      showConfirmButton: false,
    });
  }
  ///////////////////////////////////////////
  const productDetailItem = {
    cImage: `${cImage}`,
    title: `${cTitle}`,
    reviews: "150",
    instructor: `${cInstructor}`,
    duration: "22 hours",
    price: `${cPrice}`,
    previousPrice: `${parseInt(cPrice) + 30}`,
    description: `${cDetails}`,
  };
  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  ///////////////////////////////////////////
  if (result == null) return <Variants className="h-180" />;
  return (
    <>
      <DefaultLayout>
        <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
          <div className="container mx-auto px-4">
            {/* <ReactImageGallery
              showBullets={false}
              showFullscreenButton={false}
              showPlayButton={false}
              items={productDetailItem.cImage}
              additionalClass="custom-image-gallery"
            /> */}
            <Image
                    className="object-cover w-full h-full"
                    src={`${
                      productDetailItem.cImage ||
                      '/defaultCourse.jpeg'
                    }`}
                    alt={productDetailItem.title}
                    width={100}
                    height={100}
                  />
          </div>
          <div className="mx-auto text-color px-5 lg:px-5">
            <h2 className="pt-3 text-3xl font-bold lg:pt-0">
              {productDetailItem.title}
            </h2>
            <div className="mt-1">
              <div className="flex items-center">
                <Rater
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                  total={5}
                  interactive={false}
                  rating={3}
                />
                <p className="ml-3 text-sm text-gray-400">
                  ({productDetailItem.reviews})
                </p>
              </div>
            </div>

            <p className="font-bold">
              Instructor:{" "}
              <span className="font-normal">
                {productDetailItem.instructor}
              </span>
            </p>
            <p className="font-bold">
              Duration:{" "}
              <span className="font-normal">{productDetailItem.duration}</span>
            </p>

            <p className="mt-4 text-4xl font-bold text-violet-900">
              ${productDetailItem.price}{" "}
              <span className="text-xs text-gray-400 line-through">
                ${productDetailItem.previousPrice}
              </span>
            </p>
            <p className="pt-5 text-sm leading-5 text-gray-500">
              {productDetailItem.description}
            </p>
            <div className="mt-6">
              <p className="pb-2 text-xs text-gray-500">Language</p>
            </div>

            <div className="mt-7 flex flex-row items-center gap-6">
              <button
                onClick={mustLogin}
                className="flex h-12 w-40 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
              >
                <BiShoppingBag className="text-lg mr-2" />
                Add to cart
              </button>
              <button
                onClick={mustLogin}
                className="flex h-12 w-40 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"
              >
                <AiOutlineHeart className="text-lg mr-2" />
                Wishlist
              </button>
            </div>
          </div>
        </section>
        <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
          {comments && comments.length > 0 ? (
            <div className="container mx-auto px-4">
              <h3 className="text-2xl font-bold mt-8 text-color">Comments</h3>
              <ul className="mt-4">
                {comments.map((comment, index) => (
                  <li key={index} className="bg-gray-100 p-3 my-2 rounded-lg">
                    {Object.entries(comment).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-sm py-2 text-color font-semibold">
                          {key}:
                        </p>
                        <p className="text-xs py-1 text-color">{value}</p>
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No comments available.</p>
          )}
        </section>
      </DefaultLayout>
    </>
  );
};

export default Page;
