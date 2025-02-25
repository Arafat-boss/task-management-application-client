import Banner from "../assets/banner.jpg";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Hero = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelGoogle = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error.message);
      });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content text-neutral-content text-center">
        <div className="w-8/12">
          <h1 className="mb-5 text-5xl font-bold">
            Challenge Your Knowledge & Sharpen Your Skills!
          </h1>
          <p className="mb-5">
            Test your brainpower with exciting quizzes! From fun facts to tricky
            questions, see how much you really know and climb the leaderboard.
            Ready to take on the challenge? Let’s go! 🎯💡
          </p>
          <button
            onClick={handelGoogle}
            className="flex items-center justify-center gap-2 lg:w-3/12 mx-auto text-black px-4 py-2 rounded-lg shadow-md bg-blue-200 opacity-75"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
