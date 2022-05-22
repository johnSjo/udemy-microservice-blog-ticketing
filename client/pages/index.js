import buildClient from '../api/buildClient';

const Root = ({ currentUser }) => {
  return currentUser ? (
    <div>
      <h1>You are sign in</h1>
      <p>Email: {currentUser.email}</p>
    </div>
  ) : (
    <h1>You are NOT sign in.</h1>
  );
};

Root.getInitialProps = async (context) => {
  const { data } = await buildClient(context)
    .get('/api/users/currentuser')
    .catch((err) => console.log(err));

  console.log('Root.getInitialProps:', data);

  return data;
};

export default Root;
