// import { Route, Redirect } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem('token'); 
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" /> // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
