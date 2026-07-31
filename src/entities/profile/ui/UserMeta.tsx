interface Props {
  email?: string;
  name?: string;
  designation?: string;
}
const UserMeta = ({ email, name, designation }: Props) => {
  return (
    <div className="flex-1 text-center sm:text-left">
      <h2 className="text-2xl font-bold mb-1">
        {name || email?.split("@")[0].toUpperCase()}
      </h2>
      <p className="text-brass-500 font-medium uppercase">
        {designation || "No Title"}
      </p>
    </div>
  );
};

export default UserMeta;
