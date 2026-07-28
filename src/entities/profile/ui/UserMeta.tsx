interface Props {
  email?: string;
  designation?: string;
}
const UserMeta = ({ email, designation }: Props) => {
  return (
    <div className="flex-1 text-center sm:text-left">
      <h2 className="text-2xl font-bold mb-1">
        {email?.split("@")[0].toUpperCase()}
      </h2>
      <p className="text-brass-500 font-medium">{designation || "No Title"}</p>
    </div>
  );
};

export default UserMeta;
