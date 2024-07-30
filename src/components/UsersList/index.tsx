interface User {
  id: string;
  avatar_url: string;
  login: string;
}

interface Props {
  users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => (
  <>
    {users.map((user, index) => {
      return (
        <div key={index}>
          <img src={user.avatar_url} alt="" />
          <span>{user.login}</span>
        </div>
      );
    })}
  </>
);

export default UsersList;