import { useNavigate } from "react-router-dom";
import { Img, Input, Text } from "components";
import React, { useRef, useState } from "react";
import { USER_AVATAR } from "../../utils/constants";
import { checkValidate } from "../../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { removeUser } from "../../utils/userSlice";
import { provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  //sigin with google pop up
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // to check authentication and redirect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/upload");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  // sign in with email
  const handleButtonClick = () => {
    const message = checkValidate(email.current.value, password.current.value);

    setErrorMessage(message);

    if (message) return;

    if (!isSignIn) {
      //signUp code
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      //signIn code
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          navigate("/");
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <>
      <div className="bg-gray-50 flex flex-col font-montserrat items-start justify-start mx-auto w-full">
        <div className="flex md:flex-col flex-row md:gap-10 gap-[94px] items-center justify-start md:px-5 w-[86%] md:w-full">
          {/* mob-header */}
          <div className="sm:bg-[#605bff] hidden  sm:h-[80px] sm:w-screen sm:flex sm:items-center sm:justify-start md:bg-[#605bff]  md:h-[80px] md:w-screen md:flex md:items-center md:justify-start ">
            <div className="text-[#fff] ml-4">
              <svg
                className="text-[#fff]"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25.9902 12.6291L19.7848 9.44685C19.4943 8.735 18.7951 8.23336 17.9787 8.23336C17.1081 8.23336 16.3707 8.80392 16.1202 9.59152L9.99098 14.6481C9.67551 14.4286 9.29214 14.3 8.87872 14.3C8.36808 14.3 7.90328 14.4963 7.55566 14.8175L0.121365 11.1829C1.00521 4.86344 6.43234 0 12.9954 0C20.051 0 25.7938 5.62091 25.9902 12.6291ZM6.99929 16.7717L0 13.3498C0.185401 20.3678 5.93266 26 12.9954 26C19.6871 26 25.1979 20.944 25.9161 14.4437L25.7557 14.7565L19.4134 11.504C19.0571 11.891 18.5462 12.1334 17.9787 12.1334C17.5037 12.1334 17.0683 11.9635 16.73 11.6812L10.8023 16.5715C10.649 17.4955 9.84616 18.2 8.87872 18.2C7.98246 18.2 7.22743 17.5953 6.99929 16.7717Z"
                  fill="#fff"
                />
              </svg>
            </div>
            <div className="text-[#fff] font-nunito ml-3 text-xl font-semibold">
              Base
            </div>
          </div>

          <div
            className="bg-cover bg-no-repeat sm:hidden md:hidden sm:h-20 h-[1024px] md:h-[296px] sm:items-center sm:justify-start p-[54px] md:px-10 sm:px-5 relative w-[59%] md:w-full sm:w-screen"
            style={{ backgroundImage: "url('images/img_group2.svg')" }}
          >
            <div className="absolute flex flex-col md:gap-10 gap-[328px] h-max inset-y-[0] justify-start left-[8%] my-auto w-[54%]">
              <div className="bg-white-A700 h-20 sm:h-[26px] mr-[302px] rounded-[50%] w-20 sm:w-[25.99px]"></div>
              <div className="flex flex-col md:gap-10 gap-[357px] items-center justify-start md:ml-[0] ml-[83px] w-[79%] md:w-full">
                <Text
                  className="md:text-5xl text-7xl text-white-A700_01"
                  size="txtMontserratBold72"
                >
                  BASE
                </Text>
                <div className="flex flex-row items-center justify-between w-[299px]">
                  <Img
                    className="h-11 w-11"
                    src="images/img_user.svg"
                    alt="user"
                  />
                  <Img
                    className="h-[41px] w-[42px]"
                    src="images/img_trash.svg"
                    alt="trash"
                  />
                  <Img
                    className="h-12 w-12"
                    src="images/img_carbonlogolinkedin.svg"
                    alt="carbonlogolinke"
                  />
                  <Img
                    className="h-12 w-[50px]"
                    src="images/img_carbonlogodiscord.svg"
                    alt="carbonlogodisco"
                  />
                </div>
              </div>
            </div>
            <Img
              className="absolute h-[22px] left-[8%] top-[8%]"
              src="images/img_checkmark.svg"
              alt="checkmark"
            />
          </div>
          <div className="flex flex-col items-start justify-start w-[35%] md:w-full">
            <Text
              className="text-4xl sm:text-[32px] md:text-[34px] text-black-900"
              size="txtMontserratBold36"
            >
              {isSignIn ? "SignIn" : "SignUp"}
            </Text>
            <Text
              className="mt-2 text-base text-black-900"
              size="txtLatoRegular16"
            >
              Sign in to your account
            </Text>
            <div className="flex flex-row font-montserrat gap-7 sm:gap-0 items-center justify-between mt-[27px] w-full">
              <div
                className="bg-cover bg-no-repeat flex flex-col h-8 items-center justify-end p-1.5 w-[47%]"
                style={{
                  backgroundImage: "url('images/img_googlesignin.svg')",
                }}
              >
                <div
                  className="common-pointer flex flex-row gap-[17px] items-start justify-start sm:w-[153px] w-[82%] md:w-full"
                  onClick={() => signInWithGoogle()}
                >
                  <Img
                    className="h-[15px] w-[15px]"
                    src="images/img_googleicon1.svg"
                    alt="googleiconOne"
                  />
                  <Text
                    className="mt-0.5 text-center text-gray-600 text-xs"
                    size="txtMontserratRegular12"
                  >
                    Sign in with Google
                  </Text>
                </div>
              </div>
              <div
                className="bg-cover bg-no-repeat flex flex-col h-8 items-center justify-end p-1.5 w-[47%]"
                style={{
                  backgroundImage: "url('images/img_googlesignin.svg')",
                }}
              >
                <div className="flex flex-row gap-[17px] items-start justify-center w-[76%] md:w-full">
                  <Img
                    className="h-[15px] mb-0.5"
                    src="images/img_user_gray_500.svg"
                    alt="user_One"
                  />
                  <Text
                    className="mt-[3px] text-center text-gray-600 text-xs"
                    size="txtMontserratRegular12"
                  >
                    Sign in with Apple
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex mb-6 flex-col font-lato gap-6 items-center justify-start mt-[27px] w-full">
              <div
                className="bg-cover bg-no-repeat bg-[#fff] flex flex-col h-auto min-h-[347px] items-center justify-end p-8 sm:px-5 w-full"
                style={{
                  backgroundImage: "url('images/img_googlesignin.svg')",
                }}
              >
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col items-start justify-start w-full"
                >
                  {!isSignIn && (
                    <>
                      <Text
                        className="text-base mt-[11px] text-black-900"
                        size="txtLatoRegular16"
                      >
                        Name
                      </Text>
                      <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="w-[100%] mb-[11px] h-[43.91px] mt-[11px] border-none flex-shrink-0 rounded-[10px] bg-[#F5F5F5]"
                      />
                    </>
                  )}
                  <Text
                    className="text-base text-black-900"
                    size="txtLatoRegular16"
                  >
                    Email address
                  </Text>
                  <input
                    ref={email}
                    type="email"
                    placeholder="email"
                    className="w-[100%] h-[43.91px] mt-[11px] border-none flex-shrink-0 rounded-[10px] bg-[#F5F5F5]"
                  />

                  <Text
                    className="mt-[22px] text-base text-black-900"
                    size="txtLatoRegular16"
                  >
                    Password
                  </Text>
                  <Input
                    ref={password}
                    name="groupOne"
                    type="password"
                    placeholder="password"
                    className="leading-[normal] p-0 placeholder:text-black-900 text-base text-left w-full"
                    wrapClassName="mt-[11px] w-full"
                  ></Input>
                  <button className="mt-[23px] text-base text-blue-700">
                    <Text size="txtLatoRegular16Blue700">Forgot password?</Text>
                  </button>
                  <p className="text-red-500 font-bold text-lg py-2">
                    {errorMessage}
                  </p>
                  <div
                    className="common-pointer bg-cover bg-no-repeat flex flex-col font-montserrat h-[43px] items-center justify-start mt-[21px] p-[11px] rounded-[10px] w-full"
                    style={{
                      backgroundImage: "url('images/img_buttonsignin.svg')",
                    }}
                    onClick={handleButtonClick}
                  >
                    <button className="text-base text-center text-white-A700_01">
                      <Text
                        className="common-pointer"
                        size="txtMontserratBold16"
                        onClick={handleButtonClick}
                      >
                        {!isSignIn ? "Sign Up" : "Sign In"}
                      </Text>
                    </button>
                  </div>
                </form>
              </div>
              <Text
                className="text-base text-center text-gray-600"
                size="txtLatoRegular16Gray600"
                onClick={toggleSignInForm}
              >
                <span className="text-gray-600 font-lato font-normal">
                  {isSignIn
                    ? "Don’t have an account? "
                    : "Already Registered?  "}
                </span>
                <span className="text-blue-700 font-lato font-normal">
                  {isSignIn ? " Register here" : "Sign In Now"}
                </span>
              </Text>
            </div>
            {/* mob-icons */}
            {/* <div className="hidden sm:flex sm:mt-2 items-center justify-between w-full">
                  <img
                    className="h-11 w-11 bg-[#858585] rounded-full"
                    src="images/img_user.svg"
                    alt="user"
                  />
                  <Img
                    className="h-[41px] w-[42px]"
                    src="images/img_trash.svg"
                    alt="trash"
                  />
                  <Img
                    className="h-12 w-12"
                    src="images/img_carbonlogolinkedin.svg"
                    alt="carbonlogolinke"
                  />
                  <Img
                    className="h-12 w-[50px]"
                    src="images/img_carbonlogodiscord.svg"
                    alt="carbonlogodisco"
                  />
                </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
