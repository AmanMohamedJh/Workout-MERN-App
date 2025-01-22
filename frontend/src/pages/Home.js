import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext"; // this is imported to allow to see the homepage after the authorization is done only

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);//its removed
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext(); //This user is the authorized user (after logged or signup)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        // this header is the one has the ability to show the header with the token id (can check it in middleware)
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        // setWorkouts(json); // it also removed
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    //if the user is logged in fetch the workouts otherwise dont
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
