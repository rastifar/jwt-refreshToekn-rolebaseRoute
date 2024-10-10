import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
const Missing = () => {
  // return (
  //     <article style={{ padding: "100px" }}>
  //         <h1>Oops!</h1>
  //         <p>Page Not Found</p>
  //         <div className="flexGrow">
  //             <Link to="/">Visit Our Homepage</Link>
  //         </div>
  //     </article>
  // )
  const error = useRouteError();
  console.error(error);
  return <div>Something went wrong!</div>;
};

export default Missing;
